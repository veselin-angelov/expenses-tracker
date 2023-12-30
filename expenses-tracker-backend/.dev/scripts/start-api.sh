#!/bin/bash

echo "Targeted env: $RUNTIME_ENVIRONMENT";
cd /usr/src/app

case $RUNTIME_ENVIRONMENT in
  dev)
    yarn start:dev
    ;;

  debug)
    yarn start:debug
    ;;

  *)
    yarn install
    yarn build
    yarn start:prod
    ;;

esac