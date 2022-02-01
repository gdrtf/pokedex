import { Link } from "react-router-dom";
import './List.css';

export default function List({name, items}) {

  return (
    <div>
      <div className="label"><h4>{name}</h4></div>
      <div className="list">
        {
          items.map(o => {
            const link = `/pokemon/${o}`;
            return (<div key={o} className="item">
              <Link className="link" to={link}>{o}</Link>
            </div>)
          })
        }
      </div>
    </div>
  )
}