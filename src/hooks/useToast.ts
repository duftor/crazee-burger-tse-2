import { toast, ToastOptions, TypeOptions } from "react-toastify"

type ToastType = Exclude<TypeOptions, "default">

export const useToast = () => {
	const displayToastNotification = (message: string, type: ToastType = "info", options?: ToastOptions) => {
		const toastOptions: ToastOptions = {
			theme: "dark",
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			...options,
		}

		switch (type) {
			case "info":
				toast.info(message, toastOptions)
				break
			case "success":
				toast.success(message, toastOptions)
				break
			case "error":
				toast.error(message, toastOptions)
				break
			default:
				toast(message, toastOptions)
		}
	}

	return { displayToastNotification }
}
