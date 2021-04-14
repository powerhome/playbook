if [ $1 = "disable" ] ; then
  echo "=========== Precompile disabled"
else
  echo 'argument supplied but different from not, precompiling'
  cd RAILS_ENV=production SECRET_KEY_BASE=does_not_matter_here bin/rails assets:precompile
fi
