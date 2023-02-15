<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

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
- class-validator: `for input validation`

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
| registeredSince | Date |

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
| Action | Method | Route | Body Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| Create Uset  | `POST`  | `/auth/register` | email <br> password <br>  first_name <br> last_name   | Not Required |
| login | `POST`  | `/auth/login` | email <br> password | Not Required |


## Address endPoints
| Action | Method | Route | Body Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| create  | `POST`  | `/addresses/create` | first_name <br> last_name <br>  address <br> phone   | Required |
| update | `PUT`  | `/addresses/update/:addressID` | first_name <br> last_name <br>  address <br> phone | Required |
| delete  | `POST`  | `/addresses/delete/:addressID` | - | Required |
| import  | `POST`  | `/addresses/import/:addressID` | - | Required |
| findByID | `GET`  | `/addresses/:addressID` | - | Required |
| find all | `GET`  | `/addresses` | - | Required |
| find all sorted by name | `GET`  | `/addresses/sorted?by=name` | - | Required |
| search by name | `GET`  | `/addresses/search?name={name of user(s) to search for}` | - | Required |
