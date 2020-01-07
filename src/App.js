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

function ActiveBible (props) {
    const bibles = [{bible:'Ukrainian Ogienko'},
                    {bible:'King James'},
                    {bible:'Rusian Synodal'}];
     //let alertWhenChanged = () => console.log('from activeBible');
     return (
        <div>
            <DropdownList
                data = {bibles}
                valueField='bible'
                textField= 'bible'
                defaultValue= {bibles[0].bible}
                onChange = {props.onChange}
            />
        </div>
    )
}


class App extends Component {
    constructor(props) {
    super(props)
     this.state = {
            current_bible: {bible:'King James'} ,
          }

        /////////all binds here
this.handleWhatBible = this.handleWhatBible.bind(this);
    }///end constructor

    /////////////////////////////////////////
  async  handleWhatBible(value) {
      //console.log('we are heer!!! ');
      //console.log(value);
    await    this.setState((currentState) => {
            return {

                current_bible: value,

        }
        }
      )
    }



///////////////////////////////////////////
  render() {
   return (
     <div className="container">

         <ActiveBible onChange={(value) => {this.handleWhatBible(value)}}
         />

     <VerseMemorize bible = {this.state.current_bible} />
      </div>
        )
    }
}

export default App;


