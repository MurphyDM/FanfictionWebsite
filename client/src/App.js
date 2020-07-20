import React, {useEffect} from 'react'
import Header from './components/Header'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Profile from './pages/Profile'
import CatalogContainer from './pages/CatalogContainer'
import AuthenticatedComponent from './components/auth/AuthenticatedComponent'

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import rootReducer from './store/rootReducer'

const store = createStore(rootReducer);

function App() {
    return (
        <Provider store={store}>
            <Header/>
            <Router>
                <Switch>
                    <Route exact path="/"
                        component={Home}/>
                    <Route path="/signin"
                        component={SignIn}/>
                    <Route path="/signup"
                        component={SignUp}/>
                    <Route path="/catalog/:genre"
                        component={CatalogContainer}/>
                    <AuthenticatedComponent>
                        <Route path="/profile"
                            component={Profile}/>
                    </AuthenticatedComponent>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
