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
componentDidMount() {
    const noteId = this.props.match.params.noteId
    fetch(`https://localhost:8000/api/articles/${noteId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(res => {
            this.setState({
                noteName: res.noteName,
                content: res.content,
                selectedFolder: res.selectedFolder
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
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
fetch(`${config.API_ENDPOINT}/notes/${this.props.match.params.noteId}`, {
    method: 'PATCH',
    body: JSON.stringify(this.state.inputValues),
    headers: {
        'content-type': 'application/json'
    },
})
    .then(res => res.json())
    .then(responseData => {
        this.context.updateNote(responseData)
    })
    .catch(error => {
        console.error({ error })
    })
    //return to homepage
    this.props.history.push('/');
}




    render() {
        const { noteName, content, selectedFolder } = this.state
        return (
            <div>
                <h2>Edit Note</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h3>Name of Note:</h3>
                    <input
                            required
                            type='text'
                            value={noteName}
                            name='noteform'
                            onChange={this.handleChangeNoteName}
                        />
                    </label>
                    <label>
                        <h3>Content Here:</h3>
                    <textarea
                            type='text'
                            value={content}
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
