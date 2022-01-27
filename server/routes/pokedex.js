import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();
import express from 'express';
const router = express.Router();

function getPokemon(res) {
  return {
    id: res.id,
    name: res.name,
    types: res.types.map(function(t) {
        return t.type.name;
    }),
    image: res.sprites.front_default,
    height: res.height/10,
    weight: res.weight/10
  };
}

router.get('/pokemon/:name', (req, res) => {
  if (req.user) {
    P.getPokemonByName([req.params.name])
    .then((response) => {
      res.status(200).json(getPokemon(response[0]))
    })
    .catch((error) => {
      console.log("error on pokedex/pokemon/" + req.params.name + ": " + error.response.statusText);
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