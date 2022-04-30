import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Login } from "./routes/login";
import { Register } from "./routes/register";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="login" element = {<Login />}></Route>
			<Route path="register" element = {<Register />}></Route>
		</Routes>
	</BrowserRouter>
	
);
