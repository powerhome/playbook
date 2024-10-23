#!/bin/bash

 cluster="$1"
 namespace="$2"

ctrl="kubectl --context $cluster -n $namespace"

mysql_pod=$($ctrl get pods --no-headers -o custom-columns=":metadata.name" | grep 'pxc-0$')
secret_po_name=$($ctrl get pxc -o jsonpath='{.items[0].spec.secretsName}')
root_pwd=$(eval "$ctrl get secrets $secret_po_name -o jsonpath='{.data.root}'" | base64 --decode )

if [ -z "$mysql_pod" ]; then
  exit 0
fi

mysql_pod="$mysql_pod -c pxc"

users=$($ctrl get configmap mysql-users-playbook -o=jsonpath='{.data.users}' | sed 's/^"//;s/"$//;s/\\\"/\"/g')

custom_users=()
mysql_commands=()

clean_up_users() {
  local percona_users=("root" "clustercheck" "monitor" "operator" "pmmserver" "proxyadmin" "replication" "xtrabackup")
  local target_users=("$@")

  if [ ${#target_users[@]} -gt 0 ]; then
    for element in "${target_users[@]}"; do
      percona_users+=("$element")
    done
  fi

  excluded_users_list=$(printf "'%s'," "${percona_users[@]}")
  excluded_users_list=${excluded_users_list%,}

  command="SELECT CONCAT(\"'\", user, \"'@'\", host, \"'\") FROM mysql.user WHERE NOT (user LIKE 'mysql%' OR user IN ($excluded_users_list));"

  users_to_delete=$($ctrl exec $mysql_pod -- mysql -uroot -p$root_pwd -N -e"$command")

  echo "--- List of MySQL users to delete:"
  echo $users_to_delete
  #  Loop through the list of users and execute DROP USER statements
  #  we can't use `delete from` statement as if it will be once deleted,
  #  we will be unable to recreate it with the same name/password/grants due to mysql security policy
  for user in $users_to_delete; do
    $($ctrl exec $mysql_pod -- mysql -uroot -p$root_pwd -e "DROP USER $user;")
  done
}

if [ -z "$users" ]; then
  clean_up_users "${custom_users[@]}"
  exit 0
fi

# Extract the count of user objects
count=$(echo "$users" | grep -o '{' | wc -l)

if [ "$count" -eq 0 ]; then
  clean_up_users "${custom_users[@]}"
  exit 0
fi

for (( i=1; i<=$count; i++ )); do
  # Extracting each user block
  block=$(echo "$users" | awk -v RS='},' 'NR=='$i'')

  name=$(echo "$block" | grep -o '"name":"[^"]*"' | awk -F\" '{print $4}')
  grant=$(echo "$block" | grep -o '"grant":"[^"]*"' | awk -F\" '{print $4}')
  user_pwd=$(eval "$ctrl get secrets $secret_po_name -o jsonpath='{.data.$name}'" )

  custom_users+=("$name")

  if [ -z "$user_pwd" ]; then
    echo "No password in $secret_po_name for user $name"
    exit 1
  else
    user_pwd=$(echo "$user_pwd" | base64 --decode)
  fi

  mysql_commands+=("CREATE USER IF NOT EXISTS '$name'@'%' IDENTIFIED BY '$user_pwd'")

  # Extract dbs and append '.*' to each one
  dbs_raw=$(echo "$block" | grep -o '"dbs":\["[^]]*"' | sed 's/"dbs":\["//' | sed 's/"//g' | sed 's/,/, /g')
  IFS=', ' read -ra dbs_array <<< "$dbs_raw"
  for db in "${dbs_array[@]}"; do
    mysql_commands+=("GRANT $grant ON ${db}.* TO '$name'@'%'")
  done
done

clean_up_users "${custom_users[@]}"

# get list of users with 'mysql_native_password' plugin
users_w_deprecated_auth=$($ctrl exec $mysql_pod -- mysql -uroot -p$root_pwd -Bse "SELECT CONCAT(user, '@', host) FROM mysql.user WHERE plugin = 'mysql_native_password';")

# alter authentication plugin
for user in $users_w_deprecated_auth; do
  uname=$(echo "$user" | cut -d "@" -f 1)
  user_pwd=$(eval "$ctrl get secrets $secret_po_name -o jsonpath='{.data.$uname}'" )
  if [ -n "$user_pwd" ]; then
    user_pwd=$(echo "$user_pwd" | base64 --decode)
    quoted_username=$(echo "$user" | sed "s/\(.*\)@\(.*\)/'\1'@'\2'/")
    mysql_commands+=("ALTER USER $quoted_username IDENTIFIED WITH caching_sha2_password BY '$user_pwd'")
  fi
done

mysql_commands+=("FLUSH PRIVILEGES;")

IFS=';'
joint_output="${mysql_commands[*]}"
unset IFS

$($ctrl exec $mysql_pod -- mysql -uroot -p$root_pwd -e "$joint_output")

if [ $? -eq 0 ]; then
  echo "$joint_output" | sed "s/BY '[^']*'/BY '***'/g" | tr ';' '\n'
  echo "--- Users CREATED with password and granted permissions."
else
  echo "--- User creation and permission granting FAILED"
  exit 1
fi
