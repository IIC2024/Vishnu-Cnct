import { UserProvider } from "./components/UserContext";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Nav from './components/Nav'
import Footer from './components/Footer'
function App() {
  return (
   <UserProvider>
    
<Router>
  <Nav />
  <Routes>
  <Route exact path="/" element={<LandingPage/>} />
  <Route exact path="signup" element={<Register />} />
  <Route exact path="login" element={<Login />} />
  <Route exact path="/home" element={<Home />} />
  </Routes>
</Router>
    <Footer />
   </UserProvider>
  );
}

export default App;
