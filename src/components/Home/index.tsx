
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { Navbar } from "../navbar";
import { TodoList } from "../TodoList";
export default function Home() {
	const {isAuthenticated} = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		!isAuthenticated() && navigate("/login");
	});
	
	return (
		<>
			<Navbar/>
			<div className="mt-64"></div>
			<TodoList/>
		</>
	);
}