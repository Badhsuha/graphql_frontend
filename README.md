# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Important

This is only the front-end of the full stack app, you can find the backend using nodejs and mongodb, appollo-server
in graphql_api repo link [https://github.com/Badhsuha/graphql_api]

After cloning both the back-end[graphql_api] and front-end[graphql-fronend] download all depedncies using npm install

cd into graphql_api and run
`npm install`

create a new file called config.js in the root director [graphql_api]
inside config.js add code  
 `module.exports = { MONGODB: "mongodb atlas server", SECRET_KEY: "any random string", };`

`npm run server`

cd into graphql_frontend and run
`npm install`

`npm start`

keep both fron and backend running

You can find the front-end server running in [http://localhost:3000]
and the backend server running in [http://localhost:5000]
