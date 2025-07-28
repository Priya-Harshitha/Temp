import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{showLogin ? "Login" : "Signup"} Page</h1>
      {showLogin ? (
        <>
          <Login />
          <p>
            Don't have an account?{" "}
            <button onClick={()=>setShowLogin(false)}>Sign up</button>
          </p>
        </>
      ) : (
        <>
          <Signup />
          <p>
            Already have an account?{" "}
            <button onClick={()=>setShowLogin(true)}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
