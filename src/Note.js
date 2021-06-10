import React from 'react';
import { Link } from 'react-router-dom';
// import { format } from 'date-fns'

//list each individual note file
export default function Note(props){
    return (
        <div>
            <Link to={`/note/${props.id}`}>
                <h2>{props.name}</h2>
            </Link> 
            <button>
                remove
            </button>
            <h3>
                Last Modified 
                {/* {format(props.modified, 'Do MMM YYYY')} */}
            </h3>
        </div>
    )
}