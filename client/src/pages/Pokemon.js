import { useState, useEffect } from "react";
import { useLocation, useNavigate  } from 'react-router-dom';

import Card from "../components/card/Card";
import Autocomplete from "../components/autocomplete/Autocomplete";
import Loading from "../components/loading/Loading";
import NotFound from "../components/notfound/NotFound";

export default function Pokemon() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.pathname.split('/')[2];

  const [pokemon, setPokemon] = useState(null);
  const [names, setNames] = useState(null);

  useEffect(() => {
    const getPokemon = () => {
      setPokemon(null);
      fetch(`/api/pokemon/byname/${name}`, {
        method: "GET",
        credentials: "include"
      }).then(response => {
        if (response.status === 200)
          return response.json();
        else if (response.status === 404)
          throw new Error("Pokemon not found");
        throw new Error("Authentication has failed!");
      }).then(pokemon => {
        if (pokemon == null)
          throw new Error("Pokemon not found");
        pokemon.found = true;
        return loadImage(pokemon);
      }).then(pokemon => {
        setPokemon(pokemon);
      }).catch(error => {
        setPokemon({found : false});
        console.log(error);
      })
    };
    getPokemon();
  }, [name]);

  useEffect(() => {
    const getNames = () => {
      fetch(`/api/pokemon/names`, {
        method: "GET",
        credentials: "include"
      }).then(response => {
        if (response.status === 200)
          return response.json();
        else
          throw new Error("Authentication has failed!");
      }).then(pokemons => {
        setNames(pokemons);
      }).catch(error => {
        console.log(error);
      })
    };
    getNames();
  }, []);

  const loadImage = (pokemon) => new Promise((resolve, reject) => {
    if (pokemon.front == null)
      resolve(pokemon);
    const img = new Image();
    img.addEventListener('load', () => resolve(pokemon));
    img.addEventListener('error', (err) => reject(err));
    img.src = pokemon.front;
  });

  const getRandomPokemonName = () => {
    const rand = 1 + Math.floor(Math.random() * names.length);
    return names[rand];
  }
  
  const loadToRandomPokemon = () => {
    navigate(`/pokemon/${getRandomPokemonName()}`, { replace: false } );
  }

  if (pokemon) {
    if (pokemon.found) {
      return (
        <div className="wrapper">
          <Card pokemon={pokemon} />
          <div className="form">
            <Autocomplete names={names} />
            <button className="btn" onClick={loadToRandomPokemon}>random</button>
          </div>
        </div>
      )
    } else {
      return <NotFound />
    }
  } else {
    return <Loading />
  }
}