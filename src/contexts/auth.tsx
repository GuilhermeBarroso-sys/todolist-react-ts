import { createContext, ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../services/api";
type User = {
	sk: string
  email: string,
  id: string,
  name: string
}
type AuthResponse = {
	token: string;
	user: User;
}
type AuthContextData = {
	user: User|null;
	signOut: () => void;
	signIn: ({email,password}:ISignIn) => Promise<boolean>
	signUp: ({name,email,password}:ISignUp) => Promise<boolean>
	isAuthenticated: () =>  boolean;
}
interface ISignIn {
	email: string;
	password: string;
}
type RegisterResponse = {
	name: string;
	email: string;
}
interface ISignUp {
	name:     string
	email:    string;
	password: string;
}




export const AuthContext = createContext({} as AuthContextData);
type AuthProvider = {
	children: ReactNode;
}

export function AuthProvider(props : AuthProvider) {
	const [user, setUser] = useState<User|null>(null);

	async function signIn({email,password}: ISignIn)  {
		try {
			const response = await api.post<AuthResponse>("users/authenticate", {
				email,
				password
			});
			const {token,user} = response.data;
      
			localStorage.setItem("@guitodolist:token", token);
			api.defaults.headers.common.authorization = `Bearer ${token}`;
			setUser(user);
			return true;
		} catch({response}) {
			return false;
		}
	}

	async function signUp({name,email,password}:ISignUp) {
		try {
			await api.post<RegisterResponse>("users", {
				name,
				email,
				password,
			});
			return true;
		} catch({response}) {
			return false;
		}	
	}

	function signOut() {
		setUser(null);
		localStorage.removeItem("@guitodolist:token");
		return true;
	}

	function isAuthenticated() {
		const token = localStorage.getItem("@guitodolist:token");
		if(!token) {
			return false;
		}
		api.defaults.headers.common.authorization = `Bearer ${token}`;
		return true;
	}


	useEffect(() => {
		const token = localStorage.getItem("@guitodolist:token");
		if(token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`;
			api.get<User>("users/authenticate")
				.then(({data}) => {
					setUser(data);
				})
				.catch(() => {signOut();});
		}
	},[]);

	return (
		<AuthContext.Provider value ={{user, signOut, signIn, signUp, isAuthenticated}}>
			{props.children}
		</AuthContext.Provider>
	);
}