# Setup

> npm install
> mongod

In another terminal:

> npm start

Running npm start will start the crawler and the api.
The project scrapes the Github repositories API. Crawler will output the user and repository that it is currently crawling.

# Using the api

Endpoints:
HTTP METHOD | ENDPOINT | RESOURCE
GET | /users | Returns all scraped github users and their repositories.
GET | /repos | Returns all repositories of scraped data.
GET | /repos?sort=field-value | Returns sorted data based on field and value. Value can be 'asc', 'desc', 'ascending' or 'descending'.
GET | /repos?field=value | Returns filtered data based on field and value.

A few examples:

* http://localhost:8080/api/users
* http://localhost:8080/api/repos
* http://localhost:8080/api/repos?sort=watchers_count-asc
* http://localhost:8080/api/repos?user=airbnb&language=javascript

# A few commands to access the database

To start:

> mongo
> show dbs
> use project

Commands:

> show collections
> db.users.find()
> db.repos.find()

db.users.find() will return all the users in the database, same for db.repos.find().
