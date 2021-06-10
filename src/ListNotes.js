//list notes, <Note />, add note button
import React from 'react'
import Note from './Note'

export default function ListNotes(props) {
    return (
        <>
        <ul>
        {props.notes.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          </li>
        )}
      </ul>
      <button>Add Note</button>
      </>
    )
}