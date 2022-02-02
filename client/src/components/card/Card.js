import List from "../list/List";
import Type from "../type/Type";
import './Card.css';

export default function Card({pokemon}) {

  return (
    <div className='card'>
      <div className='line'>
        <div className='column'>
          <div className='line'>
            {pokemon.front ? <img src={pokemon.front} alt="" /> : <div />}
            {/* {pokemon.back ? <img src={pokemon.back} alt="" /> : <div />} */}
          </div>
          {/* <div className='line'>
            <div className="label">{pokemon.height}m</div>
            <div className="label">{pokemon.weight}kg</div>
          </div> */}
        </div>
        <div className='column'>
          <div className="label name"><h1>{pokemon.name}</h1></div>
            <div className='line'>
              <div className='types'>
                {pokemon.types.map(type => {
                  return <Type key={type} type={type} />
                })}
              </div>
            <div className="label">id: {pokemon.id}</div>
          </div>
        </div>
      </div>
      <div className="text">{pokemon.descr}</div>
      {pokemon.from != null && pokemon.from.length > 0 ? <List name="Evolves from" items={pokemon.from} /> : <div />}
      {pokemon.varieties != null && pokemon.varieties.length > 1 ? <List name="Varieties" items={pokemon.varieties} /> : <div />}
    </div>
  )
}