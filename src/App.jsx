import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProviderWrapper from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import CreateEmployee from './pages/CreateEmployee';
import UpdateEmployee from './pages/UpdateEmployee';

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <Navbar />
        <div className="app-container">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<EmployeeList />} />
              <Route path="/create" element={<CreateEmployee />} />
              <Route path="/update/:id" element={<UpdateEmployee />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
