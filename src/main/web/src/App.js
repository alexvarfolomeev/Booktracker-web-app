import React from 'react';
import './App.css';
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import Books from './components/Books'
import ReadBooks from './components/ReadBooks'
import UnreadBooks from './components/UnreadBooks'
import AddBook from './components/AddBook'
import BookEditing from './components/BookEditing'
import Login from './components/Login'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container, Row, Col} from 'react-bootstrap'


function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Row>
          <Col lg={12}>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/show-all" exact component={Books} />
              <Route path="/show-read-books" exact component={ReadBooks} />
              <Route path="/show-unread-books" exact component={UnreadBooks} />
              <Route path="/add-book" exact component={AddBook} />
              <Route path='/update-book/:id' exact component={BookEditing}/>
              <Route path='/login' exact component={Login}/>
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  )
}
export default App;
