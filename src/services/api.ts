import axios from "axios";

export const api = axios.create({
	baseURL: "https://hhgh4h28b5.execute-api.sa-east-1.amazonaws.com/homol",
});