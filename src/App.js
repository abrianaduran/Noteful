import React from 'react';
import { Route, Link } from 'react-router-dom'; 
import DummyStore from './DummyStore';
import ListNotes from './ListNotes';
import ListFolders from './ListFolders';
import NoteContent from './NoteContent';
import NoteNav from './NoteNav';

export default class App extends React.Component {
  state = {
    DummyStore,
};

renderNav() {  
  return (
    <>
  <Route exact path='/'>
    <ListFolders folders={this.state.DummyStore.folders}/>
  </Route>
  <Route path='/folder:folderId'> 
    <ListFolders folders={this.state.DummyStore.folders}/>
  </Route>
  <Route path='/note/:noteId'>
    <NoteNav notes={this.state.DummyStore.notes}/>
  </Route>

  {/* <Route path='/addfolder' component={NoteNav} />
  <Route path='/addnote' component={NoteNav} /> */}
    </>
  )
} 
renderMain() {
  console.log('DummyStore rendermain notes', this.state.DummyStore.notes)
  return (
    <>
  <Route path='/'>
    <ListNotes notes={this.state.DummyStore.notes}/>
  </Route>
  <Route path='/folder:folderId'> 
    <ListNotes />
  </Route>
  <Route path='/note/:noteId'>
    <NoteContent notes={this.state.DummyStore.notes}
      //this needs to loop through the notes and find a match
      //using noteId
    />
  </Route>
    </>
  )
}

  //<Route path="/" render={() => <ListNotes />, </ListFolders />} />
  //<Route path="/folder/:folderId" render={() => <ListNotes />, <ListFolders />} />
  //<Route path="/note/:noteId" render={() => <NoteContent />, <NoteNav/>} />

  //<Route path="/add-folder" render={() => <NoteNav />, <AddFolder />} />
  //<Route path="/add-folder" render={() => <NoteNav />, <AddNote />} />


  render () {
    return (
      <div>
        <nav>{this.renderNav()}</nav> 
        <header><h1><Link to='/'>Noteful</Link></h1></header> 
        <main>{this.renderMain()}</main>
      </div>
    )
  }
}