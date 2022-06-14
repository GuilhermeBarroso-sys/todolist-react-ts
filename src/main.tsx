import React from "react";
import ReactDOM from "react-dom/client";
import "./global/styles.module.scss";
import "./index.css";
import "react-notifications-component/dist/theme.css";
import "sweetalert2/src/sweetalert2.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./routes/login";
import { Register } from "./routes/register";
import { AuthProvider } from "./contexts/auth";
import Home from "./components/Home";
import { ReactNotifications } from "react-notifications-component";
import { LoadingProvider } from "./contexts/globalLoading";


ReactDOM.createRoot(document.getElementById("root")!).render(
  
	<AuthProvider>
		<BrowserRouter>
			<LoadingProvider>
				<ReactNotifications />
				<Routes>
					<Route index element = {<Home />}></Route>
					<Route path="login" element = {<Login />}></Route>
					<Route path="register" element = {<Register />}></Route>
				</Routes>
			</LoadingProvider>
		</BrowserRouter>
	</AuthProvider>
	
);
