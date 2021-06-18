import React from 'react' 
import config from './config'

export default class AddFolder extends React.Component {
    static defaultProps = {
        onAddFolder: () => { },
        history: {
            push: () => { }
        },
    }
    state = {
        folderName: '', 

    }
    createFolderId = () => {
        const id = Math.random().toString(36).substring(2, 4)
            + Math.random().toString(36).substring(2, 4);
        return id
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({folderName: e.target.value}, function () {
            console.log(this.state.folderName)});
      }
      handleSubmit = e => {
        e.preventDefault()
        const folderName = this.state.folderName
        const folderId = this.createFolderId()
        const data = {
            id: folderId,
            name: folderName
        }
        fetch(`${config.API_ENDPOINT}/folders/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(() => {
                this.context.addFolder(folderId)
                this.props.onAddFolder(folderId)
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
                        <h3>Name of Folder:</h3>
                    <input
                            type='text'
                            value={this.state.folderName}
                            name='name'
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type='submit' />
                </form>
            </div>
        )
    }
}
