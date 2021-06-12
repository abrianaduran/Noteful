import React from 'react'
import ApiContext from './ApiContext'
import { findNote } from './Functions'
import Note from './Note'

export default class NoteContent extends React.Component {
  static defaultProps = { 
      match: { 
          params:{}
      }
  } 
  static contextType = ApiContext  
  
  handleDeleteNote = noteId => {
      this.props.history.push('/')
  } 
  render() {
      const { notes=[] } = this.context 
      const { noteId } = this.props.match.params 
      const note = findNote(notes, noteId) || { content: '' } 
      return ( 
        <Note 
            id={note.id} 
            name={note.name} 
            modified={note.modified} 
            onDeleteNote={this.handleDeleteNote}
        />

       
      )
  }

}