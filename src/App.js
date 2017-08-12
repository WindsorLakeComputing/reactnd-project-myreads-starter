import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReading: [],
    books: [],
    wantToRead: [],
    read: [],
    showSearchPage: true
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    BooksAPI.search(query, 1000).then((books) => {
      this.setState({ books })
    })
  }
/**
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }
*/
  addBookChoice = (book) => {
    switch (book.choice) {
      case 'currentlyReading':
        this.setState({currentlyReading: this.state.currentlyReading.concat( book )})
      case 'wantToRead':
        this.setState({wantToRead: this.state.wantToRead.concat( book )})
      case 'read':
        this.setState({read: this.state.read.concat( book )})
      }
    console.log(book);
    /**
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    */

  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author" content={this.state.query}/>
    
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          
           <div className="list-books">
            <ListBooks
                  books={this.state.books}
                  onAddBookChoice={this.addBookChoice}
                />
          </div>
          </div>

        ) : (

          <div className="list-books">
            <ListBooks
                  books={this.state.read}
                  onAddBookChoice={this.addBookChoice}

                />
           
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
