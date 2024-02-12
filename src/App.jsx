import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
