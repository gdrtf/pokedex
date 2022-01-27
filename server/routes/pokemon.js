import express from 'express';
const router = express.Router();
import Pokedex from 'pokedex-promise-v2';
const pokedex = new Pokedex();

pokedex.getPokemonsList()
.then((res) => {
  pokedex.pokemons = res;
  console.log("Pokemons loaded");
}).catch((error) => {
  console.log("Error on pokemons loading: " + error.response.statusText);
  res.status(error.response.status).json({
    success: false,
    message: error.response.statusText
  })
});

function formatPokemon(res) {
  return {
    id: res.id,
    name: res.name,
    types: res.types.map(function(t) {
        return t.type.name;
      }
    ),
    image: res.sprites.front_default,
    height: res.height/10,
    weight: res.weight/10
  };
}

router.get('/byname/:name', (req, res) => {
  if (req.user) {
    pokedex.getPokemonByName(req.params.name)
    .then((pokemon) => {
      res.status(200).json(formatPokemon(pokemon))
    })
    .catch((error) => {
      console.log("Error on pokemon/byname/" + req.params.name + ": " + error.response.statusText);
      res.status(error.response.status).json({
        success: false,
        message: error.response.statusText
      })
    });
  } else {
    res.status(401).json({
      success: false,
      message: "not authorized"
    })
  }
})

function getRandomPokemonName() {
  const rand = 1 + Math.floor(Math.random() * pokedex.pokemons.count);
  return pokedex.pokemons.results[rand].name;
}

router.get('/random', (req, res) => {
  if (req.user) {
    pokedex.getPokemonByName(getRandomPokemonName())
    .then((response) => {
      res.status(200).json(formatPokemon(response))
    })
    .catch((error) => {
      console.log("Error on pokemon/random: " + error.response.statusText);
      res.status(error.response.status).json({
        success: false,
        message: error.response.statusText
      })
    });
  } else {
    res.status(401).json({
      success: false,
      message: "not authorized"
    })
  }
})

export default router;