import { useRef, useState } from "react";
import { Store } from "react-notifications-component";
import { Todolist } from "..";
import { addNotification } from "../../../functions/notifications/addNotification";
import { api } from "../../../services/api";
type TodolistCreateResponse = {
  id: string;
  name: string;
  status: boolean;
}
interface CreateTodoProps {
  todolist : Todolist[]
  setTodolist: React.Dispatch<React.SetStateAction<Todolist[]>>
}
export function CreateTodo({todolist,setTodolist} : CreateTodoProps) {
	const [todoName, setTodoName] = useState("");
	const todoNameRef = useRef<HTMLInputElement>(null);
	function createTodo(event : React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if(!todoName) {
			addNotification("Erro!", "Por favor, digite o nome da tarefa", "danger", 2500, true);
			return;
		}
		api.post<TodolistCreateResponse>(`tasks`, {
			name: todoName
		}).then(({status : statusCode, data}) => {
			setTodoName("");
			statusCode === 201 && addNotification("Sucesso", "Tarefa adicionada com sucesso!", "success");
			const {id,name,status} = data;
			todoNameRef.current.value = "";
			setTodolist([...todolist, {
				id,
				name,
				status
			}]);
		});
	}
	return (
		<>
   
			<form onSubmit={createTodo}>
				<div className={`flex items-center justify-center transition-all duration-500 text-center`}>
					<input ref={todoNameRef}  onChange={(event)=>{setTodoName(event.target.value);}} className="w-3/5 text-blue-500 font-extrabold placeholder-blue-400  py-1.5 px-2 border-blue-600 rounded border-2 focus:outline-none" type="text" placeholder="Digite o nome" aria-label="nome da tarefa" />
					<button className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 text-sm  text-white py-2 px-3 rounded" type="submit">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
						</svg>
					</button>
				</div>
			</form>
		</>
	);
}