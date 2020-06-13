import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { Solution } from '../pages/solution'
import { ManualEntry } from '../pages/manual_entry'
import { CSVEntry } from '../pages/csv_entry'

export class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
        <Switch>
          <Route exact path="/manual" component={ManualEntry}></Route>
        </Switch>
        <Switch>
          <Route exact path="/csv-entry" component={CSVEntry}></Route>
        </Switch>
        <Switch>
          <Route exact path="/solution" component={Solution}></Route>
        </Switch>
      </Router>
    )
  }
}
