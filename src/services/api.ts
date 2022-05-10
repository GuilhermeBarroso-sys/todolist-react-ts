import axios from "axios";
const [url] = window.location.href.split(":");
const isHttps = url.includes("https");
const baseURL = !isHttps ? "http://localhost:3000/dev" : "https://hhgh4h28b5.execute-api.sa-east-1.amazonaws.com/homol";
export const api = axios.create({
	baseURL
});