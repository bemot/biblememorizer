import React, { Component } from 'react';
import VmOg from './VmOg';
import VmKj from './VmKj';
import VmRs from './VmRs';
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';



////////////////////////////////////////////////////
function ActiveBible (props) {
    const bibles = [{bible:'og',bname:'Ukrainian Ogienko'},
                    {bible:'kj',bname:'King James'},
                    {bible:'rs',bname:'Rusian Synodal'}];
     //let alertWhenChanged = () => console.log('from activeBible');
     return (
        <div>
            <DropdownList
                data = {bibles}
                valueField='bname'
                textField= 'bname'
                defaultValue= {bibles[0].bname}
                onChange = {props.onChange}
            />
        </div>
    )
}



class App extends Component {
    constructor(props) {
    super(props)
    this.state = {
        activeBible: 'VmOg',
    }

    this.handlerOfName = this.handlerOfName.bind(this)
} //end constructor

// handrers are here
    handlerOfName(value) {
        console.log(value);
        let whole_name = 'VM_'+value;
        return (

            <div>
                <VmOg />
            </div>

        )

}


    render() {
        return (

       <div>

        <div id="activeBook"><ActiveBible
                onChange={(value) =>
                    {this.handlerOfName(value)}
                }

            /></div>

    </div>
        );
    }
}

export default App;


