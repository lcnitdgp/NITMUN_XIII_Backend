
import './App.css';
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Form from './components/Form';
import Payment from './components/Payment';
import Dashboard from './components/dashboard';


function App() {
const token = sessionStorage.getItem('token')
  return (
    <div className="App">
       <Router>
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route path="/api/dashboard" element={token != null ? <Dashboard /> :<Navigate to="/" />} />
        <Route path="/api/payments" element={<Payment/>} />
      </Routes>
      
    </Router>
       
    </div>
  );
}

export default App;