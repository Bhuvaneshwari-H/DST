import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Thank from './Components/Thank';
import Doctors from './Components/Doctors';
import Patients from './Components/Patients';
import Dashboard from './Components/Dashboard';
import God from './Components/God';


function App() {
  return (
    <div className="App">
     
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/thank' element={<Thank />} >
            <Route index element={<Dashboard />} ></Route>
            <Route path='dashboards' element={<Dashboard />} ></Route>
            <Route path='doctors' element={<Doctors />} ></Route>
            <Route path='patients' element={<Patients />} ></Route>
          </Route>
         
        </Routes>
      
    </div>
  );
}

export default App;
