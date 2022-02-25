import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>MyApp</h1>
      <div>
        <Link to={"/login"}>Login</Link>
      </div>
      <div>
        <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
}

function Login() {
  return <h1>Login</h1>;
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
