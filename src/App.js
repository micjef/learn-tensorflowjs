import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import ObjectDetection from "./ObjectDetection"

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Router path="/objectDetection">
            <ObjectDetection />
          </Router>
          <Route path="/">
            <nav>
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/objectDetection">Object Detections</Link>
                </li>
              </ul>
            </nav>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
