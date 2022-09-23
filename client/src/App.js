// import './App.css';
import {Switch,Route} from "react-router-dom";
import LandPage from './Components/LANDING/LandingPage';
import Home from './Components/HOME/Home'
import Detail from './Components/DETAIL/Detail';
import { Form } from './Components/FORM/Form.jsx';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandPage}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/detail/:id" component={Detail} ></Route>
        <Route exact path="/create" component={Form}></Route>
        <Route exact path="/home/:filtro"></Route>
      </Switch>
    </div>
  );
}

export default App;
