#!/usr/bin/env bash

if [[ $1 == "disable" ]] ; then
  echo "=========== Precompile disabled"
else
  echo 'argument supplied but different from "disable", precompiling'
  RAILS_ENV=production NODE_ENV=production ./bin/webpack
fi
