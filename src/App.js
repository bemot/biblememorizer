import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import VerseMemorize from './BibleMemorize';
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Home = () => (
    <div className = "UkrainianOgienko"> <VerseMemorize value={{bible:'Ukrainian Ogienko'}}/></div>
)

const KingJames = () => (
    <div className = "KingJames"> <VerseMemorize value={{bible:'King James'}}/> </div>
)

const UkrainianOgienko = () => (
    <div className = "UkrainianOgienko"> <VerseMemorize value={{bible:'Ukrainian Ogienko'}} /></div>
)

const RussianSynodal = () => (
    <div className ="RussianSynodal"> <VerseMemorize value={{bible:'Russian Synodal'}}/></div>
)


class App extends Component {
    constructor(props) {
    super(props)
     this.state = {
            current_bible: 'King James' ,
          }

        /////////all binds here

    }///end constructor

    //   componentDidMount () {
    //      console.log('did mount App...')
    // }

    //componentDidUpdate(prevProps) {
    //    console.log('did update App...')
    // }
  // Typical usage (don't forget to compare props):
    //if (this.props.userIiD !== prevProps.userID) {
    // this.fetchData(this.props.userID);
    // }
    //}

        render() {
        return (
            <div className="container">
      <Router>

<Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home" >Bible Memorizer</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/ukrainianogienko">Ukrainian Ogienko</Nav.Link>
        <Nav.Link href="/kingjames">King James</Nav.Link>
        <Nav.Link href="/russiansynodal">Russian Synodal</Nav.Link>

    </Nav>

  </Navbar.Collapse>
            </Navbar>
         <Switch>
             <Route exact path="/" component={Home}/>
             <Route path="/ukrainianogienko" component={UkrainianOgienko}/>
             <Route path="/kingjames" component={KingJames}/>
             <Route path="/russiansynodal" component={RussianSynodal}/>
         </Switch>

      </Router>
  </div>
        )
    }
}

export default App;


