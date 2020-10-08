import React from 'react';
import Appbar from './Appbar';
import Login from './Login';
import {Switch,Route} from 'react-router-dom';
import PhoneBook from './PhoneBook';
import Signup from './Signup';

export default function Home() {
    
    return (
        //Routing.....
        <div>
            <Appbar />        
            <div style={{marginTop:100}}>
            <Switch>
            <Route exact path = "/" component={Login}  />
            <Route exact path = "/contactpage" component={PhoneBook} />
            <Route path = "/newuser" component={Signup} />
            </Switch>
            </div>
        </div>
    )
}
