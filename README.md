# pokedex

A simple Node.js/React application displaying information on Pokemons extracted from the PokeAPI https://pokeapi.co/docs/v2

## Functionalities

- Basic auth0/google/github authentication
- The route /pokemon/{name} leads to a page displaying a picture and some information on the Pokemon
- The user can select an other Pokemon using the autosuggest field
- Or select a random one

## Demo

https://circular-pokedex.herokuapp.com/

## Client dependencies

- http-proxy-middleware : configuration of a proxy localhost server URL for developement
- react-autosuggest : simple autosuggest field to select pokemons https://github.com/moroshko/react-autosuggest

## Server dependencies

- express, cors
- cookie-session, passport, passport-auth0, passport-github2, passport-google-oauth20 : auth0, google and github oauth autentication
- passport-mock-strategy : to allow a quick authentication for development purpose
- pokedex-promise-v2 : PokeAPI library with auto caching https://github.com/PokeAPI/pokedex-promise-v2
- dotenv (dev) : loads environment variables from .env file
- nodemon (dev) : server autorefresh after file modification

## Development

- (facultative) Add a file .env in the root folder
```
PORT=3001
CLIENT_PORT=3000
AUTH0_DOMAIN =            //-----     auth0 domain     -----//
AUTH0_CLIENT_ID =         //-----   auth0 client id    -----//
AUTH0_CLIENT_SECRET =     //-----     auth0 secret     -----//
GOOGLE_CLIENT_ID =        //-----   google client id   -----//
GOOGLE_CLIENT_SECRET =    //----- google client secret -----//
GITHUB_CLIENT_ID =        //-----   github client id   -----//
GITHUB_CLIENT_SECRET =    //----- github client secret -----//
```
- If no .env is present, the app will use the default ports and use a mocking strategy authentication
- Install dependencies recursively
```
npm install
```
- Run the server
```
npm run server
```
- Run the client
```
npm run client
```

## Continuous Integration

- eslint
- prettier