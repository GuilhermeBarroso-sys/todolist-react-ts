import { Store } from "react-notifications-component";


type NotificationType = "success" | "warning" | "danger" | "default" | "info"
export function addNotification(title: string, message: string, type: NotificationType, duration = 5000,center = false) {

	return Store.addNotification({
		title,
		message,
		type,
		insert: "top",
		container: center ? "top-center" : "top-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration,
			onScreen: true
		}
	});
}