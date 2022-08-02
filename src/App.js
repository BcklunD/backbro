import Footer from './layout/Footer';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';
import Hem from './views/Hem';
import Kontakt from './views/Kontakt';
import Ledigt from './views/Ledigt';
import Login from './views/Login';
import Profil from './views/Profil';
import Admin from './views/Admin';
import Navbar from './layout/Navbar';
import Sidemenu from './layout/Sidemenu';
import './views/views.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <Sidemenu />
      <div className="content">
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname.split("/")[1]} location={location}>
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
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default App;
