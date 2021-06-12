import React from 'react'
import Note from './Note'
import ApiContext from './ApiContext' 
import { getNotesForFolder } from './Functions'
import Button from './Button'
import { Link } from 'react-router-dom'

export default class ListNotes extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext 
  
  render() {
  const { folderId } = this.props.match.params;
  const { notes=[] } = this.context;
  const notesForFolder = getNotesForFolder(notes, folderId); 

    return (
        <>
        <ul>
        {notesForFolder.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          </li>
        )}
      </ul>
      <Button 
                tag={Link} 
                to='/add-note' 
                type='button' 
            >
                Add Note 
            </Button>
      </>
    )
        }
}