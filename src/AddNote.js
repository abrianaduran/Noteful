import React from 'react'
import config from './config'
import ApiContext from './ApiContext'
import { format } from 'date-fns'


export default class AddFolder extends React.Component {
    static defaultProps = {
        onAddNote: () => { },
        history: {
            push: () => { }
        },
    }
    static contextType = ApiContext;
    state = {
        noteName: '',
        content: '',
        selectedFolder: '',
    }

handleChangeFolder = (e) => {
    this.setState({ selectedFolder: e.target.value }, function () {
    });
}
    availableFolders = () => {
        const { folders = [] } = this.context
        return (
            <div onChange={this.handleChangeFolder}>
                {folders.map(folder => 
                <div className='radio'>
                    <label>
                    <input 
                        type='radio' 
                        value={folder.id} 
                        checked={this.state.selectedFolder === folder.id}
                        onChange={this.handleChangeFolder}
                    />
                        {folder.name}
                    </label>
                </div>
                )}
            </div>
        )
    }
    createNoteId = () => {
        const id = Math.random().toString(36).substring(2, 4)
            + Math.random().toString(36).substring(2, 4);
        return id
    }

    handleChangeNoteName = (e) => {
        e.preventDefault();
        this.setState({ noteName: e.target.value }, function () {
        });
    }
    handleChangeNoteContent = (e) => {
        e.preventDefault();
        this.setState({ content: e.target.value }, function () {
        });
    }
    handleSubmit = e => {
        e.preventDefault()
        const noteName = this.state.noteName
        const noteId = this.createNoteId()
        const selectedFolder = this.state.selectedFolder
        const content = this.state.content 
        const date = new Date().toISOString()
        // const modified = format(date, 'MMM YYYY')
        

        const data = {
            id: noteId,
            name: noteName,
            modified: date,
            folderId: selectedFolder, 
            content: content, 
        }
//${noteId}
        fetch(`${config.API_ENDPOINT}/notes/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(() => {
                // this.context.addNote(noteId)
                // console.log('noteID, noteName', noteId, noteName)
                this.props.onAddNote(noteId)
            })
            .catch(error => {
                console.error({ error })
            })
            //return to homepage
            this.props.history.push('/');
    }




    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h3>Name of Note:</h3>
                    <input
                            required
                            type='text'
                            value={this.state.noteName}
                            name='noteform'
                            onChange={this.handleChangeNoteName}
                        />
                    </label>
                    <label>
                        <h3>Content Here:</h3>
                    <textarea
                            type='text'
                            value={this.state.content}
                            name='noteform'
                            onChange={this.handleChangeNoteContent}
                        />
                    </label>
                    <label className='choose__folder'>
                        <h3>Choose Folder:</h3>
                    </label>
                    <>
                            {this.availableFolders()}
                    </>
                    
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}
