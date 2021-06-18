import React from 'react'
import ApiContext from './ApiContext'
import { findNote, findFolder } from './Functions'
import Button from './Button'
import PropTypes from 'prop-types'

export default class NoteNav extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }
    static contextType = ApiContext;

    render() {
        const { notes, folders } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId) || {}
        
        return (
            <div>
                <Button
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                >
                    Back
                </Button>
                    <h3>{folder.name}</h3>
            </div>

        )
    }
}
NoteNav.propTypes = {
    goBack: PropTypes.func,
    params: PropTypes.object
}
