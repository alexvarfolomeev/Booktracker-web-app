import React, { Component } from 'react'
import {Navbar, Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen} from '@fortawesome/free-solid-svg-icons';

export class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to={"/"} className="navbar-brand" style={{margin: 10}}>
            <FontAwesomeIcon icon={faBookOpen} style={{marginRight: 10}}/>
          Booktracker
        </Link>
        <Nav className="mr-auto">
          <Link to={"show-all"} className="nav-link">Список всех книг</Link>
          <Link to={"show-read-books"} className="nav-link">Список прочитанных книг</Link>
          <Link to={"show-unread-books"} className="nav-link">Список книг для прочтения</Link>
          <Link to={"add-book"} className="nav-link">Добавить книгу</Link>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation
