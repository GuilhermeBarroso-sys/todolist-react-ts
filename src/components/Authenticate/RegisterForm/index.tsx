import { useContext, useEffect, useRef, useState } from "react";
import { api } from "../../../services/api";
import login from "../../../assets/login.svg";
import styles from "./styles.module.scss";
import { isValidEmail } from "../../../functions/validation/isValidEmail";
import { Spinner } from "../../Spinner";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import { addNotification } from "../../../functions/notifications/addNotification";

export function RegisterForm() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [spinner, setSpinner] = useState(false);
	const buttonSubmitEl = useRef<HTMLButtonElement>(null);
	const {signIn, signUp, isAuthenticated} = useContext(AuthContext);
	useEffect(() => {
		isAuthenticated() && navigate("/");
	});
	function handleValidLoginInput(input : string, setState : React.Dispatch<React.SetStateAction<boolean>>) {	
		!isValidEmail(input) && input.length != 0 ? setState(true) : setState(false);	
	}

	async function handleSubmit(event : React.FormEvent) : Promise<void> {
		event.preventDefault();
		setSpinner(true);
		buttonSubmitEl.current.disabled = true;
		buttonSubmitEl.current.style.cursor = "not-allowed";
		buttonSubmitEl.current.style.opacity = "0.5";
		if(invalidEmail || password.length == 0) {
			setSpinner(false);
			buttonSubmitEl.current.disabled = false;
			buttonSubmitEl.current.style.cursor = "pointer";
			buttonSubmitEl.current.style.opacity = "1";
			Swal.fire("Error", "Por favor, verifique os campos!", "error");
			return;
		}
		const success = await signUp({name, email,password});
		setSpinner(false);
		buttonSubmitEl.current.disabled = false;
		buttonSubmitEl.current.style.cursor = "pointer";
		buttonSubmitEl.current.style.opacity = "1";
		if(!success) {
			addNotification("Erro", "Esse email Já foi utilizado!", "danger", 5000, true);
			return;
		}
		const isLogged = await signIn({email,password});
		isLogged ? navigate("/"): Swal.fire("Error", "Algo deu errado, tente novamente!", "error");

	}
	return (
		<>
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img
							className={`mx-auto h-12 w-auto ${styles.imgLogin}`}
							src={login}
						/>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrar-se</h2>
					</div>
					<form  className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="name-address" className="sr-only">nome</label>
								<input
									id="name-address"
									name="name"
									onChange={(event)  => {
										setName(event.target.value);
									}}
									type="text"
									autoComplete="name"
									required
									className={`appearance-none rounded-none relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 border-gray-300 focus:border-indigo-500 focus:z-10 sm:text-sm`}
									placeholder="Digite seu Nome"
								/>
							</div>
							<br/>
							<div className="rounded-md shadow-sm -space-y-px">
								<div className = {styles.errorEmail}><p className="text-rose-600">{invalidEmail && "Email Invalido"}</p></div>
								<div>
									<label htmlFor="email-address" className="sr-only">Email</label>
									<input
										id="email-address"
										name="email"
										onChange={(event)  => {
											setEmail(event.target.value);
										}}
										onBlur={() => {
											handleValidLoginInput(email, setInvalidEmail);
										}}
										type="email"
										autoComplete="email"
										required
										className={`appearance-none rounded-none relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none ${invalidEmail ? "focus:ring-rose-600 focus:border-rose-600 border-rose-600"  : "focus:ring-indigo-500 border-gray-300 focus:border-indigo-500"} focus:z-10 sm:text-sm`}
										placeholder="Digite seu Email"
									/>
								</div>
							</div>
							<br/>
							<div>
								<label htmlFor="password" className="sr-only">Password</label>
								<input
									id="password"
									name="password"
									type="password"
									onChange={(event) => {
										setPassword(event.target.value);
									}}
									autoComplete="current-password"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Digite sua senha"
								/>
							</div>
						</div>
					
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								/>
								<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
								</label>
							</div>
						</div>
						{/* <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
              </a>
            </div>
          </div> soon! */}

						<div>
							<button
								type="submit"
								ref={buttonSubmitEl}
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								<span className="absolute left-0 inset-y-0 flex items-center pl-3">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
									</svg>
								</span>
								<span>{spinner ? <Spinner /> : "Entrar"}</span>
							</button>
						</div>
						<p className="text-sm text-indigo-600 hover:text-indigo-400 cursor-pointer text-center"> <Link to ="/login">Ja tem um cadastro? Clique aqui! </Link></p>
					</form>
				</div>
			</div>
		</>

	);
}