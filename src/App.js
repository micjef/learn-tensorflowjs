import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import ObjectDetection from "./ObjectDetection"
import SpeechCommandRecognition from "./SpeechCommandRecognition"

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/speechCommandRecognition">
            <SpeechCommandRecognition />
          </Route>
          <Router path="/objectDetection">
            <ObjectDetection />
          </Router>
          <Route path="/">
            <nav>
              <ul>
                <li>
                  <Link to="/speechCommandRecognition">Speech Command Recognition</Link>
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
