import React, { Component } from 'react';
import './App.css';
import NavBar from './Nav/NavBar';
import CharacterList from './Characters/characters';
import { Route } from 'react-router-dom';
import  Details from './Details/details';
import  EventDashboard from './EventDetails/eventDetails';
import HttpsRedirect from 'react-https-redirect';
class App extends Component {
    render() {
        return (
            <HttpsRedirect>
            <div className = "App" >
                <NavBar className = "App-header" / >
                <Route exact path="/" component={CharacterList} />
                <Route exact path="/character/:details" component={Details} />
                <Route exact path="/eventdetails" component={EventDashboard} />
            </div>
            </HttpsRedirect>
        );
    }
}

export default App;