import { useState, useEffect } from "react";
import { useLocation, useNavigate  } from 'react-router-dom';

import Card from "../components/card/Card";
import Loading from "../components/loading/Loading";
import NotFound from "../components/notfound/NotFound";

export default function Pokemon() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.pathname.split('/')[2];

  const [pokemon, setPokemon] = useState(null);
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPokemon = () => {
      reset();
      fetch(`http://localhost:3001/pokemon/byname/${name}`, {
        method: "GET",
        credentials: "include"
      }).then(response => {
        if (response.status === 200)
          return response.json();
        else if (response.status === 404)
          setError(true);
        else
          throw new Error("Authentication has failed!");
      }).then(resObject => {
        setPokemon(resObject);
        // We preload the images before rendering
        preloadImage(setFront, resObject.front);
        preloadImage(setBack, resObject.back);
      }).catch(err => {
        console.log(err);
      })
    };
    getPokemon();
  }, [name]);

  const reset = () => {
    setPokemon(null);
    setFront(null);
    setBack(null);
    setError(null);
  }

  const preloadImage = (setState, src) => {
    if (src == null) { // src can be on some pokemon
      setState({ imageIsReady: true });
    }
    const image = new Image();
    image.onload = () => {
      setState({ imageIsReady: true });
    }
    image.src = src;
  }
  
  const random = () => {
    fetch(`http://localhost:3001/pokemon/randoname`, {
      method: "GET",
      credentials: "include"
    }).then(response => {
      if (response.status === 200)
        return response.json();
    }).then(resObject => {
        navigate(`/pokemon/${resObject}`, { replace: false } );
    }).catch(err => {
      console.log(err);
    })
  }

  if (pokemon && front && back) {
    return (
      <div className='wrapper'>
        <Card pokemon={pokemon} />
        {/* <div className="line">
          <div>
            <input type="text" />
            <button>Submit</button>
          </div>
          <div>
            <button onClick={random}>Random</button>
          </div>
        </div> */}
      </div>
    )
  } else if (error) {
    return <NotFound />
  } else {
    return <Loading />
  }
}