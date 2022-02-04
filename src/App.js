import Footer from './layout/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hem from './views/Hem';
import Kontakt from './views/Kontakt';
import Ledigt from './views/Ledigt';
import Login from './views/Login';
import Profil from './views/Profil';
import Admin from './views/Admin';
import Navbar from './layout/Navbar';
import './views/views.css';

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Hem/>}/>
          <Route path="/kontakt" element={<Kontakt/>}/>
          <Route path="/ledigt" element={<Ledigt/>}/>
          <Route path="/ledigt/:id" element={<Ledigt />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profil" element={<Profil/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/admin/:tab" element={<Admin/>}/>
          <Route path="/admin/:tab/:id" element={<Admin/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
