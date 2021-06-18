import React from 'react';
import { Route, Link } from 'react-router-dom';
import ListNotes from './ListNotes';
import ListFolders from './ListFolders';
import NoteContent from './NoteContent';
import NoteNav from './NoteNav';
import './App.css'
import ApiContext from './ApiContext';
import config from './config';
import AddFolder from './AddFolder'; 
import AddNote from './AddNote';

export default class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error });
      })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  renderNav() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={ListFolders}
          />
        ))}
        <Route path="/note/:noteId" component={NoteNav} />
        <Route path="/add-folder" component={NoteNav} />
        <Route path="/add-note" component={NoteNav} />
      </>
    );
  }
  renderMain() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={ListNotes}
          />
        ))}
        <Route path="/note/:noteId" component={NoteContent} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
    )
  }

  render() {
    const value = {
      notes: this.state.notes, 
      folders: this.state.folders, 
      deleteNote: this.handleDeleteNote
    };
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <header><h1><Link to='/'>Noteful</Link></h1></header>
          <div className='not__header'>
            <div className='nav__sidebar'>
              <nav>{this.renderNav()}</nav>
            </div>
            <div className='main'>
              <main>{this.renderMain()}</main>
            </div>
          </div>
        </div>
      </ApiContext.Provider>
    );
  }
}
//https://github.com/Thinkful-Ed/noteful-client/blob/implement-design-and-routing/src/App/App.js