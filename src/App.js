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
    <div className = "UkrainianOgienko"> <VerseMemorize value={{bible:'og'}}/></div>
)

const KingJames = () => (
    <div className = "KingJames"> <VerseMemorize value={{bible:'kj'}}/> </div>
)

const UkrainianOgienko = () => (
    <div className = "UkrainianOgienko"> <VerseMemorize value={{bible:'og'}} /></div>
)

const RussianSynodal = () => (
    <div className ="RussianSynodal"> <VerseMemorize value={{bible:'rs'}}/></div>
)


class App extends Component {
    constructor(props) {
    super(props)
     this.state = {
            current_bible: 'og' ,
          }

        /////////all binds here

    }///end constructor

    // componentDidMount () {
    //    console.log('did mount...')
    // }

    //componentDidUpdate(prevProps) {
    //    console.log('did update...')

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
        <Nav.Link href="/ukrainiaogienko">Ukrainian Ogienko</Nav.Link>
        <Nav.Link href="/kingjames">King James Bible</Nav.Link>
        <Nav.Link href="/russiansynodal">Russian Synodal</Nav.Link>

    </Nav>

  </Navbar.Collapse>
            </Navbar>
         <Switch>
             <Route exact path="/" component={UkrainianOgienko}/>
             <Route path="/kingjames" component={KingJames}/>
             <Route path="/ukrainiaogienko" component={UkrainianOgienko}/>
             <Route path="/russiansynodal" component={RussianSynodal}/>
         </Switch>

      </Router>
  </div>
        )
    }
}

export default App;


