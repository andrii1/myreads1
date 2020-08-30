import React from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import * as BooksAPI from './BooksAPI';
import SearchPage from './SearchPage';
import MainPage from './MainPage';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[]
  }
componentDidMount(){
  BooksAPI.getAll().then((books)=> {
    this.setState ({ books: books })
  })
  
}

moveShelf = (book, shelf) => {
  BooksAPI.update(book, shelf);
  BooksAPI.getAll().then((books)=> {
    this.setState ({ books: books })
  })

}
  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MainPage
          books={this.state.books}
          moveShelf={this.moveShelf}
          />
        )} />
         
         <Route path="/search" render={() => (
          <SearchPage
          moveShelf={this.moveShelf}
          books={this.state.books} />
        )} />
          
       
      </div>
    )
  }
}

export default BooksApp
