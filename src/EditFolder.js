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
    componentDidMount() {
        const folderId = this.props.match.params.folderId
        fetch(`https://localhost:8000/api/articles/${folderId}`, {
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
                    folderName: res.folderName,
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
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
        fetch(`${config.API_ENDPOINT}/folders/${this.props.match.params.folderId}`, {
            method: 'PATCH',
            body: JSON.stringify(this.state.inputValues),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(responseData => {
                this.context.updateFolder(responseData)
            })
            .catch(error => {
                console.error({ error })
            })
            //return to homepage
            this.props.history.push('/');
    }

    render() {
        const { folderName } = this.state
        return (
            <div>
                <h2>Edit Folder</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h3>Name of Folder:</h3>
                    <input
                            type='text'
                            value={folderName}
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
