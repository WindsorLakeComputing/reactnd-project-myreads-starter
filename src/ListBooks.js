import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onAddBookChoice: PropTypes.func.isRequired
  }
/**
  state = {
    value:''
  }
  */

  handleChange = (e) => {
    const { onAddBookChoice } = this.props
    /**
    this.setState({value: e.target.value});
    var id = e.target.value.split("|")[0]
    var choice = e.target.value.split("|")[1]
    let bookChoice = books.filter((book) => book.id == id)
    console.log("Inside of ListBooks.js the choice is ", choice)
    bookChoice.choice = choice
    */
    //bookChoice.choice = e.target.value
    //console.log("BOOK choice is ", bookChoice.choice)
    onAddBookChoice(e.target.value)
  }

  render() {
    //console.log("this.state.value ==", this.state.value);
    const { books } = this.props
    console.log("Inside ListBooks.js ... Books are ... ")
    console.log(books)
    

    return (
      <div className='bookshelf-books'>
        <ol className='books-grid'>            
          {books.map((book) => (
            console.log("HERE IT IS ", {book}),
            <li key={book.id} className='book-list-item'>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover"  style={{ width: 128, height:192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                    <div className='book-shelf-changer'>
                      <select value={book.choice} onChange={this.handleChange} >
                        <option value="none" disabled>Move to...</option>
                        <option value={book.id + "|currentlyReading"}>Currently Reading</option>
                        <option value={book.id + "|wantToRead"}>Want to Read</option>
                       <option value={book.id + "|read"}>Read</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
            </li>
          ))}
        </ol>
                  </div>
)
        }
      }

export default ListBooks
