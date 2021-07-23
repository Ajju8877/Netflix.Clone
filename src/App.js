import "./styles.css";
import {Switch, Route} from "react-router";
import Home from "./Home";
import Login from "./Login";

export default function App() {
  return(
     <div className="app">
         <Switch>
            <Route exact path="/">
              <Login/>
            </Route>

            <Route exact path="/home">
              <Home/>
            </Route>
         </Switch>
      </div>
  );
}
