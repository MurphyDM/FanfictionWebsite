import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import {createStore} from "redux"
import {Provider} from "react-redux"
import rootReducer from "./store/rootReducer"

import Header from "./components/containers/HeaderContainer"
import Home from "./pages/public/Home"
import SignIn from "./components/components/auth/SignIn"
import SignUp from "./components/components/auth/SignUp"
import Profile from "./pages/protected/Profile"
import AuthenticatedComponent from "./components/components/auth/AuthenticatedComponent"
import Catalog from "./pages/public/CatalogContainer"
import Story from "./pages/public/StoryContainer"
import Comment from "./pages/public/CommentsContainer"
import Admin from "./pages/private/Admin"

const store = createStore(rootReducer);
document.ondragstart = noselect;
document.onselectstart = noselect;
document.oncontextmenu = noselect;
function noselect() {return false;}

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
                    <Route exact path="/catalog/:genre?"
                        component={Catalog}/>
                    <Route exact path="/story/:storyId"
                        component={Story}/>
                    <Route exact path="/comments/:storyId"
                        component={Comment}/>
                    <AuthenticatedComponent>
                        <Route exact path="/profile"
                            component={Profile}/>
                        <Route exact path="/administrator"
                        component={Admin}/>
                    </AuthenticatedComponent>       
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
