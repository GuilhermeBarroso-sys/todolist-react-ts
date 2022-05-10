import { useEffect } from "react";
import { LoginForm } from "../components/Authenticate/LoginForm";
import { api } from "../services/api";

export function Login() {

	return (
		<main>
			<LoginForm />
		</main>
	
	);
}