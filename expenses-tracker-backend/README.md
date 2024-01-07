# Expenses Tracker API

## Requirements

* [Node](https://nodejs.org/en/) >= v20
* [Yarn](https://yarnpkg.com/)
* Docker and docker compose

## Installation

Before you start installation, be sure to have all your configurations set.

Add the following line to ```/etc/hosts```:
````
127.0.0.1       api.tracker.local
````

After that copy the ``.env.example`` to ``.env`` and setup all the environment
variables.

After that call ``yarn install``.

## Running the dev server

To run the dev server, run

````bash
docker compose build
````

and after that run

````bash
docker compose up
````

## Running migrations

To run the migrations, run

````bash
.dev/scripts/migrations.sh
````
