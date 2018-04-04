# Setup

```
npm install
mongod
```

In another terminal:

```
npm start
```

Running npm start will start the crawler and the api.
The project scrapes the Github repositories API. Crawler will output the user and repository that it is currently crawling.

# Using the api

Endpoints:

| HTTP METHOD | ENDPOINT | RESOURCE |
|-------------|----------|----------|
| GET | /users | Returns all scraped github users and their repositories |
| GET | /users/:name/repos | Returns all repositories of given user |
| GET | /users/:user/repos/:reponame | Returns details of given repository of given user |
| GET | /repos | Returns all repositories |
| GET | /repos?sort=field-value | Returns sorted repositories based on field and value. Value can be 'asc', 'desc', 'ascending' or 'descending' |
| GET | /repos?field=value | Returns filtered repositories based on field and value |

API allows user to query multiple fields, but if there are two values to the same field, e.g. ?user=facebook&user=airbnb, only the first one (user=facebook) will be taken into account.  
API allows user to query multiple sort fields.  
API allows user to query and sort multiple fields.  

A few examples:

* http://localhost:8080/api/users
* http://localhost:8080/api/users/airbnb/repos/deline
* http://localhost:8080/api/repos
* http://localhost:8080/api/repos?sort=watchers_count-asc
* http://localhost:8080/api/repos?user=airbnb&language=javascript
* http://localhost:8080/api/repos?user=facebook&sort=language-asc&sort=watchers_count-desc

# A few commands to access the database

To start:

```
mongo
show dbs
use project
```

Commands:

```
show collections
db.users.find()
db.repos.find()
```

To stop mongod:

```
use admin
db.shutdownServer()
```

db.users.find() will return all the users in the database, same for db.repos.find().
