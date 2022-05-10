
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { TodoList } from "../TodoList";
export function Navbar() {
	const { signOut} = useContext(AuthContext);
	const navigate = useNavigate();
	const {user} = useContext(AuthContext);
	const [firstName, setFirstName] = useState("");
  
	useEffect(() => {
		if(user) {
			const [name] = user.name.split(" ");
			setFirstName(name);
		}
	}, [user]);
	function handleSignOut() {
		signOut();
		navigate("/login");
	}
	return (
		<Disclosure as="nav" className="bg-blue-500 flex items-baseline justify-around">
			{user && <h1 className="text-2xl text-slate-50">Seja bem-vindo, <span className={"text-white font-extrabold"}>{firstName}!</span></h1>}
			<p><button className = 'text-right text-white text-xl font-bold hover:text-gray-200' onClick={handleSignOut}>Sair</button></p>
		</Disclosure>
	);
}