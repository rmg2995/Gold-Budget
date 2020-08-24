# IronPlate with Hooks
##### git fork and/or clone https://github.com/Tzikas/IronPlate.git 
## Start Server
##### cd backend/ 
##### npm i 
##### nodemon 


## Start client
##### cd frontend/ 
##### npm i 
##### npm start

##### *For google auth you'll need a [client key](https://www.google.com/search?q=how+to+get+google+oauth+client+id&source=lmns&bih=798&biw=1199&rlz=1C5CHFA_enUS889US889&hl=en&sa=X&ved=2ahUKEwjc7LLz8qvrAhXZZt8KHSg6AfIQ_AUoAHoECAEQAA)*


## Deploy DB
##### sign in with Atlas. 
##### Get connection string and add it to .env file. MONGDB_URI = ...

## Deploy to Heroku
##### go to heroku and follow instructions to connect to github OR install heroku CLI and type heroku create in the root 
##### enable automatic deploys and trigger depoly 
##### git add . 
##### git commit -m 'deploying' 
##### git push
##### git push heroku master
##### add convig var for MONGDB_URI in heroku dashboard


## Deploy to Netlify
##### Login to Netlify & Select the repo
##### In deploy settings build command write: cd ./frontend && npm install && npm run build
##### In Publish Directory write: frontend/build
##### Add an environment variable: CI = false 
##### In backend/app.js add client url generated by Netlify
##### In frontend/src/api/index.js add heroku url as a production endpoint 

# Gold-Budget
