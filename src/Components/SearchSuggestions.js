import React from 'react'
import { Link } from 'react-router-dom';


const Suggestions = (props) => {

  const options = props.results.map(r => (
    <Link to={{ pathname: `/profile/${r.id}`}} >
    <li key={r.id} class="search-suggestion">
    <img alt={r.first_name} class="search-suggestion-img" src={r.profile_img}/>
      <p class="search-suggestion-name">{r.first_name} {r.last_name}</p>
    </li>
    </Link>
  ))
  return <ul class="search-suggestions">{options}</ul>
}

export default Suggestions