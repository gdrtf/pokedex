import express from "express";
const router = express.Router();
import Pokedex from "pokedex-promise-v2";
const pokedex = new Pokedex();

// we download all the pokemon names so they can be used in the autosuggest field
pokedex
  .getPokemonsList()
  .then((res) => {
    pokedex.pokemons = res.results;
    pokedex.names = {
      array: res.results.map((o) => o.name),
      hashset: new Set(res.results.map((o) => o.name)),
    };
    console.log("Pokemons loaded");
  })
  .catch((error) => {
    console.log("Error on pokemons loading: " + error.response.statusText);
    res.status(error.response.status).json({
      success: false,
      message: error.response.statusText,
    });
  });

function setPokemonDetails(pokemon, details) {
  pokemon.id = details.id;
  pokemon.species = details.species.name;
  pokemon.types = details.types.map((t) => t.type.name);
  pokemon.front = details.sprites.front_default;
  pokemon.back = details.sprites.back_default;
  pokemon.height = details.height / 10;
  pokemon.weight = details.weight / 1;
}

function clean(text) {
  return text.replace("\n", " ").replace("\f", " ").replace("  ", " ");
}

function setPokemonSpecies(pokemon, species) {
  for (var i = 0; i < species.flavor_text_entries.length; i++) {
    if (species.flavor_text_entries[i].language.name == "en") {
      pokemon.descr = clean(species.flavor_text_entries[i].flavor_text);
      break;
    }
  }
  if (species.evolves_from_species != null)
    pokemon.from = [species.evolves_from_species.name];
  pokemon.varieties = species.varieties.map((t) => t.pokemon.name);
}

// return the specified pokemon
router.get("/byname/:name", (req, res) => {
  const pokemon = { name: req.params.name };
  return new Promise((resolve) => {
    if (!req.user) throw new Error("not authorized");
    if (!pokedex.names.hashset.has(pokemon.name))
      throw new Error("unkown pokemon");
    resolve(pokedex.getPokemonByName(pokemon.name));
  })
    .then((details) => {
      setPokemonDetails(pokemon, details);
      return pokedex.getPokemonSpeciesByName(pokemon.species);
    })
    .then((species) => {
      setPokemonSpecies(pokemon, species);
      return res.status(200).json(pokemon);
    })
    .catch((error) => {
      const message = error.message ?? error.response.statusText;
      console.log(
        "Error on pokemon/byname/" + req.params.name + ": " + message
      );
      res.status(error.response?.status ?? 404).json({
        success: false,
        message: message,
      });
    });
});

function getRandomPokemonName() {
  const rand = 1 + Math.floor(Math.random() * pokedex.pokemons.length);
  return pokedex.pokemons[rand].name;
}

// returns a random pokemon name
router.get("/randoname", (req, res) => {
  if (req.user) {
    res.status(200).json(getRandomPokemonName());
  } else {
    res.status(401).json({
      success: false,
      message: "not authorized",
    });
  }
});

// returns a random pokemon
router.get("/random", (req, res) => {
  return new Promise((resolve) => {
    if (!req.user) throw new Error("not authorized");
    resolve(pokedex.getPokemonByName(getRandomPokemonName()));
  })
    .then((response) => {
      res.status(200).json(formatPokemon(response));
    })
    .catch((error) => {
      const message = error.message ?? error.response.statusText;
      console.log("Error on pokemon/random: " + message);
      res.status(error.response?.status ?? 401).json({
        success: false,
        message: message,
      });
    });
});

// return all the pokemon names
router.get("/names", (req, res) => {
  if (req.user) {
    res.status(200).json(pokedex.names.array);
  } else {
    res.status(401).json({
      success: false,
      message: "not authorized",
    });
  }
});

export default router;
