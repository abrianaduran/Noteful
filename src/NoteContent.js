import React from 'react'
import Note from './Note'
//display note content and note tile
export default function NoteContent(props) {
    // console.log('NoteContent')
    // console.log('props', props)
    // console.log('note modified date', props.notes.notes.modified)
    return (
        <>
            <Note
                //id={props.notes.notes.id}
                name={props.notes.notes.name}
                //modified={props.notes.notes.modified}
            />
            <div>
                {props.note.content}
            </div>
        </>
    )
}