import React from 'react'
import { NavLink } from 'react-router-dom'

//List folders for side nav
export default function ListFolders(props) {

    return (
        <div>
            <ul>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink to={`/folder/${folder.id}`} className="selected-folder">
                            {folder.name}
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )

}


