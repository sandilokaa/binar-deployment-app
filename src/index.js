import React from "react";
import { render } from "react-dom";
import './index.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import{ BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { Provider } from "react-redux";
import { store } from "./app/store";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateData from "./pages/CreateData";
import UpdateData from "./pages/UpdateData";
import About from "./pages/About";


const root = document.getElementById('root');
render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/createdata" element={<CreateData />}></Route>
        <Route path="/update/:id" element={<UpdateData />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </Router>
  </Provider>,
  root
);
