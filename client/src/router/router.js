import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "../pages/home"
import { Solution } from "../pages/solution"

export class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                </Switch>
                <Switch>
                    <Route exact path = '/solution' component = {Solution} ></Route>
                </Switch>
            </Router>
        )
    }
}
