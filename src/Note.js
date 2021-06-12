import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css'
import config from './config' 
import ApiContext from './ApiContext'
import Button from './Button'
// import { format } from 'date-fns'

export default class Note extends React.Component {
    static defaultProps ={
        onDeleteNote: () => {},
    } 
    static contextType = ApiContext;

    handleDelete = e => {
        e.preventDefault() 
        console.log('handleDelete')
        console.log('noteId', this.props.id)
        const noteId = this.props.id 

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE', 
            headers: {
                'conent-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok) 
            return res.json().then(e => Promise.reject(e)) 
        return res.json()
        })
        .then(() => {
            this.context.deleteNote(noteId) 
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({ error })
        })
    };

    
    render() {
        const { name, id, modified } = this.props 
    return (
        
        <div className='list__item'>
            <Link to={`/note/${id}`}>
                <h2>{name}</h2>
            </Link> 
        <button
          className='delete__button'
          type='button'
          onClick={this.handleDelete}
        >
          remove
        </button>
            <h3>
                Last Modified :
                {/* {format(modified, 'Do MMM YYYY')} */}
            </h3>
        </div>
    )
    }
}