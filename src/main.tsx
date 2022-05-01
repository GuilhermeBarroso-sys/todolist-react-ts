import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./routes/login";
import { Register } from "./routes/register";
import { AuthProvider } from "./contexts/auth";


ReactDOM.createRoot(document.getElementById("root")!).render(
  
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="login" element = {<Login />}></Route>
				<Route path="register" element = {<Register />}></Route>
			</Routes>
		</AuthProvider>
	</BrowserRouter>
	
);
