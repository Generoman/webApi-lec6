import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useLoader } from "./useLoader";
import { fetchJSON } from "./fetchJSON";

function LoginLinks() {
  return (
    <>
      <div>
        <Link to={"/login"}>Login</Link>
      </div>
      <div>
        <Link to={"/register"}>Register</Link>
      </div>
    </>
  );
}

function FrontPage() {
  const { loading, error, data, reload } = useLoader(
    async () => await fetchJSON("/api/login")
  );

  const user = data;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.toString()}</div>;

  return (
    <div>
      <h1>My Test App</h1>
      {user ? (
        <div>
          {user.fullName} ({user.username})
          <button
            onClick={async () => {
              await fetch("/api/login", { method: "delete" }).then(reload);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <LoginLinks />
      )}
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) {
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        Username:{" "}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </div>
      <div>
        Password:{" "}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
}

function Register() {
  return <h1>Register</h1>;
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
