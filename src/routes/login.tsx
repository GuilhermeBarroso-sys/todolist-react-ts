import { useEffect } from "react";
import { UserForm } from "../components/UserForm";
import { api } from "../services/api";

export function Login() {
	useEffect(() => {
		api.post("/users", {
			name: "gui",
			email: "gui@gmail.com",
			password: "123"
		}).then(() => {
			console.log();
		});
	});
	return (
		<main>
			<UserForm />
		</main>
	);
}