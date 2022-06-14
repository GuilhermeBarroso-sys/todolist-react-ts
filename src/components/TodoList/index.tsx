import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { addNotification } from "../../functions/notifications/addNotification";
import { api } from "../../services/api";
import { CreateTodo } from "./CreateTodo";
import styles from "./styles.module.scss";
import notasks from "../../assets/notasks.svg";
import {BulletList} from "react-content-loader";
export type Todolist = {
  id?: string;
  name: string;
  status: boolean;
}
export function TodoList() {
	const [todolist, setTodolist] = useState<Todolist[]>([]);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const {user} = useContext(AuthContext);
	useEffect(() => {
		setLoading(true);
		if(user != null) {
			api.get<Todolist[]>(`tasks`).then((response) => {
				const {data} = response; 
				setTodolist(data);
				setLoading(false);
			});
		}
	},[user]);
	async function onCheckChange(event : React.ChangeEvent<HTMLInputElement>, todo: Todolist) {
		const {checked} = event.target;
		const {id,name} = todo;
		setTodolist(todolist.map((todolist) => {
			if(todolist.id === id) {
				todolist.status = checked;
			}
			return todolist;
		}));
		await api.put(`tasks/update/${id}`, {
			name,
			status: checked ? 1 : 0
		});
	}
	async function handleDeleteTask(id: string) {
		setIsLoading(true);
		api.delete(`tasks/delete/${id}`)
			.then(() => {
				setTodolist(todolist.filter(todo => todo.id !== id));
				addNotification("Sucesso!", "Task deletada com sucesso!", "info");
				setIsLoading(false);

			})
			.catch(() => {
				setIsLoading(false);
			});
	}
	return (
    
		<div className={`container ${styles.center} text-center`}>
			<CreateTodo todolist={todolist} setTodolist={setTodolist} />
			<div className="mt-10">
				<div className={`w-full flex flex-col`}>
					{loading
						? <BulletList  backgroundColor="rgb(59 130 246)" width={"70%"} height={"100%"}/>
						: <div>
							{todolist.length > 0 
								? todolist.map(({id,name,status}) => {
									return (
										<div className="mt-1 mb-1 flex w-full justify-center content-start " key={id}>
											<span className="">{status 
												? <input onChange = {(event) => {onCheckChange(event, {id,name,status});}} className="form-check-input p-2.5 appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none mt-1 align-top bg-no-repeat bg-center bg-contain  mr-3 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" defaultChecked/> 
												: <input onChange = {(event) => {onCheckChange(event, {id,name,status});}} className="form-check-input p-2.5 appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none mt-1 align-top bg-no-repeat bg-center bg-contain   mr-3 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" /> 
											}</span>
                
											<span className={`${styles.textResponsive} w-2/4 overflow-auto text-gray-800  text-left  text-xl mr-5 ${status ? "line-through text-slate-600" : ""}`}> {name}</span>
											<span className="flex">

												{
													!isLoading 
														? 	<button className="text-right  text-red-600 " onClick={() => {
															handleDeleteTask(id);
														}}>
															<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
																<path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
															</svg>
														</button>
														: <button className="text-right  text-red-600" disabled>
															<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
																<path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
															</svg>
														</button>
												}
											</span>
											{/* <button className="text-right  ml-4 text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button> */}

										</div>
									);
								})
								:
								<div className = "flex flex-col align-middle justify-center">
									<h1 className="text-2xl text-gray-700 mb-10 ">Parece que você não tem tarefas criadas :D</h1>
									<div className="flex justify-end">

										<img src = {notasks} className="w-full h-80 animate-pulse" />
									</div>
								</div>
							}

						</div> }
					
          
				</div>
			</div>
		</div>
	);
}