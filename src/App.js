import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SignIn from "./components/signin";
const App =() => {
   return (
    <div className="app">

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
