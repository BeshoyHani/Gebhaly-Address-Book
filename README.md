<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Simple Address Book API built with Nest.js

## Table of Content
1. [Tools and Dependancies](#tools-and-dependancies)
2. [Installation](#installation)
3. [.env File Description]()
4. [Running the app](#running-the-app)
5. [Models](#models)
6. [End points](#end-points)


## Tools and Dependancies
- TypeScript
- MongoDB
- JsonWebToken
- bcrypt: `To hash password before storing it`
- passport: `uses jwt strategy to perform authentication and authorization`


## Installation

```bash
$ npm install
```

## .env File Description
```bash
MONGO_URI= *The URI to MongoDB Document*
SECRET_KEY= *an arbitrary string to be used in creating JWT*
SALT_ROUNDS= *integer specify the number of salt and rounds for hashing password*
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Models
### User Model
|  Column | Type |
| --------- | --------- |
| first_name | String |
| last_name | String |
| email | String |
| password | String |

### Address Model
|  Column | Type | Description
| --------- | --------- | ------|
| userID | String | ID of the user that created the address |
| first_name | String |
| last_name | String |
| adress | String |
| phone | String |


## End points
### Auth endPoints
| Action | Method | Route | Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| Create Uset  | `POST`  | `/auth/register` | email <br> password <br>  first_name <br> last_name   | Not Required |
| login | `POST`  | `/auth/login` | email <br> password | Not Required |


## Address endPoints
| Action | Method | Route | Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| create  | `POST`  | `/addresses/create` | first_name <br> last_name <br>  address <br> phone   | Required |
| update | `PUT`  | `/addresses/update/:addressID` | first_name <br> last_name <br>  address <br> phone | Required |
| delete  | `POST`  | `/addresses/delete/:addressID` | - | Required |
| import  | `POST`  | `/addresses/import/:addressID` | - | Required |
| findByID | `GET`  | `/addresses/:addressID` | - | Required |
| find all | `GET`  | `/addresses` | - | Required |
| find all sorted by name | `GET`  | `/my/link` | pageNo* | Required |
| search by name | `GET`  | `/addresses/search?by=name` | - | Required |