import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import {createStore} from "redux"
import {Provider} from "react-redux"
import rootReducer from "./store/rootReducer"

import Header from "./components/components/Header"
import Home from "./pages/public/Home"
import SignIn from "./components/components/auth/SignIn"
import SignUp from "./components/components/auth/SignUp"
import Profile from "./pages/protected/Profile"
import AuthenticatedComponent from "./components/components/auth/AuthenticatedComponent"
import Catalog from "./pages/public/CatalogContainer"
import Story from "./pages/public/Story"


const store = createStore(rootReducer);
document.ondragstart = noselect;
// запрет на перетаскивание
document.onselectstart = noselect;
// запрет на выделение элементов страницы
document.oncontextmenu = noselect;
// запрет на выведение контекстного меню
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
                         <Route exact path="/catalog"
                        component={Catalog}/>
                         <Route exact path="/catalog/:storyId"
                        component={Story}/>
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
