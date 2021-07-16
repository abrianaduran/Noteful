import React from 'react';
import { Link } from 'react-router-dom';
import config from './config' 
import ApiContext from './ApiContext'
import { format } from 'date-fns'
import NoteError from './NoteError'
import PropTypes from 'prop-types'

export default class Note extends React.Component {
    static defaultProps ={
        onDeleteNote: () => {},
    } 
    static contextType = ApiContext;

    handleDelete = e => {
        e.preventDefault() 
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
            <NoteError>
            <Link to={`/note/${id}`}>
                <h2>{name}</h2>
            </Link> 
            <Button
                tag={Link}
                to={`/edit/${note.id}`}
                type='button'
              >
                Edit Note
              </Button>
        <button
          className='delete__button'
          type='button'
          onClick={this.handleDelete}
        >
          remove
        </button>
            <h3>
                Last Modified : {modified}
                {/* {format(modified, 'MMM')} */}
            </h3>
            </NoteError>
        </div>
    )
    }
}

Note.propTypes = {
    onDeleteNote: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired
}