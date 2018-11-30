# Building RESTful APIs with Node.js, Express, MongoDB and TypeScript

This is a simple API that performs the follwoing:
- Login
- Regsitration
- Get all users
- Update user
- Delete user 

## Requirements

[NodeJS](https://nodejs.org/en/)

Install global TypeScript and TypeScript Node

```
npm install -g typescript ts-node
```

## Clone this repository

```
git clone https://github.com/varunnayyar76/ts-node-rest.git
```

Then install the dependencies

```
npm install
```

## Start the server

Run in development mode

```
npm run dev
```

Run in production mode 

```
npm run prod
```


## Working Routes

`The default URL is: https://localhost:3000`

The key and cert in the config folder is for testing purpose only. You should generate your own.

`
GET: https://localhost:3000
`

Get all users:

`
GET: https://localhost:3000/user/
`

Save a user:

`
POST: https://localhost:3000/user/
`

Update a user:

`
PUT: https://localhost:3000/user/userID
`

Delete a user:

`
DELETE: https://localhost:3000/user/userID
`
