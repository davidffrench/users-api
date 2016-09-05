# Users API

This sample project will give you a minimal users RESTful API to build your contact list template against. It only implements user listing and reading - feel free to add other actions (e.g. update, delete, create) as you see fit. It is built using JavaScript/Node.js (our language of choice), ExpressJS (a small, lightweight web MVC framework) & Mongoose (a MongoDB object modelling library).

## Pre-requisites

To get started, you'll need to have the following requirements installed

- Git
- Node.js<sup>1</sup>
- npm
- MongoDB 2.6.x / 3.2.x<sup>2</sup>

<sup>1</sup>See https://nodejs.org/

<sup>2</sup>See https://docs.mongodb.com/manual/administration/install-community/ for installation guides

## Getting started
	
	# Ensure `mongod` is running, either as a service or in another shell
	git clone <this repo>
	npm install
	npm run-script seed # Seed the DB with Users
	npm start

## Running tests

`npm test`

## API documentation

See [API.md](API.md) for details.

## SonarQube
In addition to ESLint, we've also included some configuration for SonarQube in `sonar-project.properties`.

See http://docs.sonarqube.org/display/SONAR/Get+Started+in+Two+Minutes for more details on how to setup SonarQube locally.

## Potential next steps
- Fix bugs
- Implement authentication and login screen
- Better handling of screen sizes with number of columns in grid list
- Better error handling for API calls on client

## Docker
Can't use right now.

Unfortunately i had issues getting docker-compose working correctly. The issue is down the networking between the containers with the API container connecting to the mongoDB container. This was resolved by specifying the docker container name on mongoose connect but then it won't work through non docker installation. There is also an issue with the seed script not running on setup.

Since the work was done, I have included the docker-compose.yml file in the users-api repo.

## Known bugs
- React doesn't rerender the grid list after user delete - need to refresh to update for deleted user. Based on switching to setState inside the component
- On new user create - issue with updating the user state onChange of valid form. Workaround right now is to focus and blur on another field after filling all fields
- Unable to upload picture for new user
  - This leads to issues with new user displaying on grid list
- Ability to clear filter selection. easily done but issue with space for another button in the app bar on mobile. need to extend autocomplete component to reduce size.