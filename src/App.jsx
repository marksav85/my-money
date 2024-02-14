import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar></Navbar>
          <Routes>
            <Route
              path="/"
              element={!user ? <Navigate to="/login" replace /> : <Home />}
            />
            <Route
              path="login"
              element={user ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="signup"
              element={user ? <Navigate to="/" replace /> : <Signup />}
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
