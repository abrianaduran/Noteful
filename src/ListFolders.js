import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './ListFolders.css'
import ApiContext from './ApiContext'
import { countNotesForFolder } from './Functions';
import Button from './Button'


export default class ListFolders extends React.Component {
    static contextType = ApiContext;
    render () {
        const { folders=[], notes=[] } = this.context
    return (
        <div>
            <ul>
                {folders.map(folder =>
                    <li key={folder.id} className="folder__item">
                        <NavLink 
                            to={`/folder/${folder.id}`} 
                            activeClassName="selected__folder">
                            <h2>{folder.name}</h2> 
                        </NavLink>
                        {countNotesForFolder(notes, folder.id)}
                    </li>
                )}
            </ul>
            <Button 
                tag={Link} 
                to='/add-folder' 
                type='button' 
            >
                Add Folder 
            </Button>
        </div>
    )
                }
}


