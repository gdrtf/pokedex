import express from 'express';
const router = express.Router();
import Pokedex from 'pokedex-promise-v2';
const pokedex = new Pokedex();

// we download all the pokemon names so they can be used in the autosuggest field
pokedex.getPokemonsList()
  .then((res) => {
    pokedex.pokemons = res.results;
    pokedex.names = {
      array: res.results.map(o => o.name),
      hashset: new Set(res.results.map(o => o.name))
    };
    console.log("Pokemons loaded");
  }).catch((error) => {
  console.log("Error on pokemons loading: " + error.response.statusText);
  res.status(error.response.status).json({
    success: false,
    message: error.response.statusText
  })
});

function setPokemonDetails(pokemon, details) {
  pokemon.id = details.id;
  pokemon.species = details.species.name;
  pokemon.types = details.types.map(t => t.type.name);
  pokemon.front = details.sprites.front_default;
  pokemon.back = details.sprites.back_default;
  pokemon.height = details.height/10;
  pokemon.weight = details.weight/1;
}

function fetchPokemonDetails(pokemon, action) {
  pokedex.getPokemonByName(pokemon.name)
  .then((details) => {
    setPokemonDetails(pokemon, details);
    action();
  })
  .catch((error) => {
    console.log("Error on pokemon/byname/" + req.params.name + ": " + error.response.statusText);
    res.status(error.response.status).json({
      success: false,
      message: error.response.statusText
    })
  });
}

function setPokemonSpecies(pokemon, species) {
  for (var i = 0; i < species.flavor_text_entries.length; i++) {
    if (species.flavor_text_entries[i].language.name == "en") {
      pokemon.descr = species.flavor_text_entries[i].flavor_text.replace("\n", " ").replace("\f", " ").replace("  ", " ");
      break;
    }
  }
  if (species.evolves_from_species != null)
    pokemon.from = [ species.evolves_from_species.name ];
  pokemon.varieties = species.varieties.map(t => t.pokemon.name);
}

function fetchPokemonSpecies(pokemon, action) {
  pokedex.getPokemonSpeciesByName(pokemon.species)
  .then((species) => {
    setPokemonSpecies(pokemon, species);
    action();
  })
  .catch((error) => {
    console.log("Error on pokemon/byname/" + req.params.name + ": " + error.response.statusText);
    res.status(error.response.status).json({
      success: false,
      message: error.response.statusText
    })
  });
}

// return the specified pokemon
router.get('/byname/:name', (req, res) => {
  if (req.user) {
    const pokemon = {name : req.params.name};
    if (pokedex.names.hashset.has(pokemon.name)) {
      fetchPokemonDetails(pokemon, () => fetchPokemonSpecies(pokemon, () => res.status(200).json(pokemon)));
    } else {
      console.log("Pokemon not found on pokemon/byname/" + req.params.name);
      res.status(404).json({
        success: false,
        message: "not found"
      });
    }
  } else {
    console.log("Error on pokemon/byname/" + req.params.name + ": not authorized");
    res.status(401).json({
      success: false,
      message: "not authorized"
    })
  }
})

function getRandomPokemonName() {
  const rand = 1 + Math.floor(Math.random() * pokedex.pokemons.length);
  return pokedex.pokemons[rand].name;
}

// returns a random pokemon name
router.get('/randoname', (req, res) => {
  if (req.user) {
    res.status(200).json(getRandomPokemonName());
  } else {
    res.status(401).json({
      success: false,
      message: "not authorized"
    });
  }
})

// returns a random pokemon
router.get('/random', (req, res) => {
  if (req.user) {
    pokedex.getPokemonByName(getRandomPokemonName())
    .then((response) => {
      res.status(200).json(formatPokemon(response));
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

// return all the pokemon names
router.get('/names', (req, res) => {
  if (req.user) {
    res.status(200).json(pokedex.names.array);
  } else {
    res.status(401).json({
      success: false,
      message: "not authorized"
    });
  }
})

export default router;