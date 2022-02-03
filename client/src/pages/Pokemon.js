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
        else if (response.status === 404) {
          setPokemon({success : false});
          throw new Error("Pokemon not found");
        } else
          throw new Error("Authentication has failed!");
      }).then(p => {
        p.success = true;
        if (p.front == null) {
          setPokemon(p);
        } else {
          const image = new Image();
          image.onload = () => {
            setPokemon(p);    
          }
          image.src = p.front;
        }
      }).catch(err => {
        console.log(err);
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
      }).then(l => {
        setNames(l);
      }).catch(err => {
        console.log(err);
      })
    };
    getNames();
  }, []);


  const getRandomPokemonName = () => {
    const rand = 1 + Math.floor(Math.random() * names.length);
    return names[rand];
  }
  
  const loadToRandomPokemon = () => {
    navigate(`/pokemon/${getRandomPokemonName()}`, { replace: false } );
  }

  if (pokemon?.success) {
    return (
      <div className="wrapper">
        <Card pokemon={pokemon} />
        <div className="form">
          <Autocomplete names={names} />
          <button className="btn" onClick={loadToRandomPokemon}>random</button>
        </div>
      </div>
    )
  } else if (!pokemon?.success) {
    return <NotFound />
  } else {
    return <Loading />
  }
}