import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { HomePage } from "./components/HomePage";
import { IsProtected } from "./components/IsProtected";

function App() {
  //this is how you grab data from the context
  //or take food from the frig
  const { user, setUser } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <IsProtected>
              <HomePage />
            </IsProtected>
          }
        />

        <Route path="*" element={<h1> 404 Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
