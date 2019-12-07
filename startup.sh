if [ $# -eq 0 ] ; then
  echo '=========== Precompiling'
  cd spec/dummy; RAILS_ENV=production SECRET_KEY_BASE=does_not_matter_here bin/rails assets:precompile --trace
else
  if [ $1 = "disable" ] ; then
    echo "=========== Precompile disabled"
  else
    echo 'argument supplied but different from not, precompiling'
    cd spec/dummy; RAILS_ENV=production SECRET_KEY_BASE=does_not_matter_here bin/rails assets:precompile --trace
  fi
fi
