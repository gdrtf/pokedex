import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Card from "../components/card/Card";
import Lookup from "../components/lookup/Lookup";
import Loading from "../components/loading/Loading";
import NotFound from "../components/notfound/NotFound";

export default function Pokemon() {
  const location = useLocation();
  const name = location.pathname.split("/")[2];

  const [pokemon, setPokemon] = useState(null);
  const [names, setNames] = useState(null);

  useEffect(() => {
    const getPokemon = () => {
      setPokemon(null);
      fetch(`/api/pokemon/byname/${name}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else if (response.status === 404) {
            setPokemon({ found: false });
            throw new Error("Pokemon not found");
          } else if (response.status === 401) {
            logout();
          }
          throw new Error(response.statusText);
        })
        .then((pokemon) => {
          if (pokemon == null) throw new Error("Pokemon not found");
          pokemon.found = true;
          return loadImage(pokemon);
        })
        .then((pokemon) => {
          setPokemon(pokemon);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getPokemon();
  }, [name]);

  useEffect(() => {
    const getNames = () => {
      fetch(`/api/pokemon/names`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else throw new Error("Authentication has failed!");
        })
        .then((pokemons) => {
          setNames(pokemons);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getNames();
  }, []);

  const logout = () => {
    window.open("/api/auth/logout", "_self");
  };

  const loadImage = (pokemon) =>
    new Promise((resolve, reject) => {
      if (pokemon.front == null) resolve(pokemon);
      const img = new Image();
      img.addEventListener("load", () => resolve(pokemon));
      img.addEventListener("error", (err) => reject(err));
      img.src = pokemon.front;
    });

  if (pokemon) {
    if (pokemon.found) {
      return (
        <div className="wrapper">
          <Card pokemon={pokemon} />
          <Lookup names={names} />
        </div>
      );
    } else {
      return <NotFound />;
    }
  } else {
    return <Loading />;
  }
}
