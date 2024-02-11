#!/bin/bash

if [ ! -f ../../.env ]
then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

export DATABASE_MIGRATIONS_PATH=./src/migrations
export DATABASE_ENTITIES_PATH="./(src|libs)/**/entities/*.ts"
export DATABASE_SEEDERS_PATH="./tests/database/**/"
MESSAGE="Enter the name of the command. Can be generate, up, down, list, pending, dump, debug, import, initial, dump-for-tests, seed, seed-all, create-seed, fresh-seed, fresh-seed-all or exit: "

echo -n $MESSAGE
read COMMAND

while ([ "$COMMAND" != "exit" ]); do
  case $COMMAND in

  generate)
    yarn mikro-orm migration:create
    ;;

  initial)
    yarn mikro-orm migration:create -i
    ;;

  up)
    yarn mikro-orm migration:up
    ;;

  down)
    yarn mikro-orm migration:down
    ;;

  list)
    yarn mikro-orm migration:list
    ;;

  pending)
    yarn mikro-orm migration:pending
    ;;

  dump)
    yarn mikro-orm schema:create -d
    ;;

  dump-for-tests)
    export ENVIRONMENT=production
    # yarn mikro-orm schema:create -d >./test/database/schema.sql
    ;;

  debug)
    yarn mikro-orm debug
    ;;

  import)
    echo -n "File path to import: "
    read FILE_PATH

    yarn mikro-orm database:import $FILE_PATH
    ;;

  seed)
      echo -n "Seeder: "
      read SEEDER

      yarn mikro-orm seeder:run --class=$SEEDER
      ;;
  seed-all)
      yarn mikro-orm seeder:run
      ;;
  create-seed)
      echo -n "Seeder: "
      read SEEDER

      yarn mikro-orm seeder:create $SEEDER
      ;;
  fresh-all-seed)
        yarn mikro-orm seeder:fresh --seed
        ;;
  fresh-seed)
      echo -n "Seeder: "
      read SEEDER

      yarn mikro-orm seeder:fresh --seed $SEEDER
      ;;

  exit)
    exit 0
    ;;

  *)
    echo -n "Please use generate, migrate-up, migrate-down "
    ;;
  esac

  echo -n $MESSAGE
  read COMMAND
done
