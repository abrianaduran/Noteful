import React from 'react'
import ApiContext from './ApiContext'
import { findNote } from './Functions'
import config from './config.js'
import PropTypes from 'prop-types'

// import { format } from 'date-fns'

export default class NoteContent extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        },
        onDeleteNote: () => { },
        history: {
            push: () => { }
        },
    }
    static contextType = ApiContext

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
        this.props.history.push('/');
    };

    render() {
        // const { modified } = this.props
        const { notes = [] } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || { content: '' }
        console.log(note.modified)
        return (
            <div className='note__details'>

                <h2>{note.name}</h2>

                <h3>
                    Last Modified :{note.modified}
                    {/* {format(modified, 'Do MMM YYYY')} */}
                </h3>
                <p className='note__content'>{note.content}</p>
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

            </div>
        )
    }
}

NoteContent.propTypes = {
    params: PropTypes.object,
    push: PropTypes.func
}