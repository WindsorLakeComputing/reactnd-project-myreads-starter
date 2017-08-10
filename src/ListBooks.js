import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onAddBookChoice: PropTypes.func.isRequired
  }

  

  handleChange = (e) => {
    console.log(e.target.value)
    //this.setState({selectValue:e.target.value});
  }

  render() {
    const { books, onAddBookChoice } = this.props

    return (
      <div className='bookshelf-books'>
        <ol className='books-grid'>            
          {books.map((book) => (
            <li key={book.id} className='book-list-item'>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover"  style={{ width: 128, height:192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                    <div className='book-shelf-changer'>
                      <select onChange={this.handleChange}>
                        <option value="none" disabled>Move to...</option>
                        <option value={book.id + "currentlyReading"}>Currently Reading</option>
                        <option value={book.id + "wantToRead"}>Want to Read</option>
                       <option value={book.id + "read"}>Read</option>
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
