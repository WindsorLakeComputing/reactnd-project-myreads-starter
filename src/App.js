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
    showSearchPage: true,
  }

  updateSearchResults(state, book) {
    state.map((e) => {
    if(book.id == e.id){
          book.shelf = e.shelf
        }
      }
      )
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })


     BooksAPI.search(query, 1000).then((books) => {
      
      books.map((book) => {
      this.updateSearchResults(this.state.wantToRead, book)
      this.updateSearchResults(this.state.read, book)
      this.updateSearchResults(this.state.currentlyReading, book)
     
      this.setState({ books: books })
})})}
   
/**
    .then((books) => {
      retBooks = [books]
    })
    */



      /**
      books.map((book) => {
        book.shelf = "reading"
        console.log(book)

/**
        this.setState((state) => ({
      books: this.state.read.concat( state.read.filter((c) => c.id == book.id))
    }))

         this.setState((state) => ({
      books: this.state.currentlyReading.concat( state.currentlyReading.filter((c) => c.id == book.id))
    }))

this.setState((state) => ({
      books: this.state.wantToRead.concat( state.wantToRead.filter((c) => c.id == book.id))
    }))
    */



        //console.log(this.state.read.filter((c) => c.id == book.id))

        //console.log(book)
      //}
      //this.setState({ books })
    //})
    //)}
  //)}

/**
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }
*/

   mapBookToState (book, shelf) {
    if (book.shelf){
      shelf = book.shelf
    }
    
     switch (shelf) {
              case 'currentlyReading':
                this.setState({currentlyReading: this.state.currentlyReading.concat( book )})
                break;
              case 'wantToRead':
                this.setState({wantToRead: this.state.wantToRead.concat( book )})
                break;
              case 'read':
                this.setState({read: this.state.read.concat( book )})
                break;
            }
    }

  
  
  
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
          books.map((book, None) => {
            this.mapBookToState(book)
            }
       )}
 ) }


  removeDuplicate(CurState, bookId){
    console.log("BOOKID IZZ ... ", bookId)

     this.setState({CurState: CurState.filter((b) => b.id !== bookId)})
  }
  

  addBookChoice = (book, shelf) => {
    console.log("Inside of AddBookChoice the book is ", book, " the value is ", shelf)

    this.removeDuplicate(this.state.read, book.id)
    
/**
    this.setState((state) => ({
      read: state.read.filter((b) => b.id !== book.id)
    }))
    this.setState((state) => ({
      currentlyReading: state.currentlyReading.filter((b) => b.id !== book.id)
    }))
    this.setState((state) => ({
      wantToRead: state.wantToRead.filter((b) => b.id !== book.id)
    }))
    */
    BooksAPI.update(book, shelf).then(()=>{
           console.log('book was updated');            
       })
    book.shelf = shelf;
    this.mapBookToState(book, shelf);


    /**
    console.log("THE BOOK ID CHOICE IS ", bookIdChoice);



    var id = bookIdChoice.split("|")[0]
    var choice = bookIdChoice.split("|")[1]
    console.log("The ID is ", id)
    var book = this.state.books.filter((book) => book.id == id)
    console.log("Inside of ListBooks.js the choice is ", choice)
    //book.choice = bookIdChoice
    book.shelf = choice
    console.log("THE BIG BOOK IS ", book)
    //book.shelf = "wantToRead"

    this.mapBookToState(book);

    
    console.log("choice == ", choice)
    
    BooksAPI.update(book, choice).then(()=>{
           console.log('book was updated');            
       })
  
    

    console.log("After setting state the book is ");
    console.log(book);
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
    <div className="list-books-title">
        <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <ListBooks books={this.state.currentlyReading} onAddBookChoice={this.addBookChoice} />
                    </ol>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <ol className="books-grid">
                        <ListBooks books={this.state.wantToRead} onAddBookChoice={this.addBookChoice} />
                    </ol>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                <ListBooks books={this.state.read} onAddBookChoice={this.addBookChoice} />
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)}
</div>
)
}
}

export default BooksApp
