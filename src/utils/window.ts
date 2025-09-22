export const refreshPage = () => window.location.reload()

export const setLocalStorage = <T>(key: string, value: T) => {
	localStorage.setItem(key, JSON.stringify(value))
}

// version spontanée
// export const getLocalStorage = (key: string) => {
//   const item = localStorage.getItem(key)
//   if (item) return JSON.parse(item)
// }

// version avec GENERIC
// export const getLocalStorage = <T>(key: string) => {
//   const item = localStorage.getItem(key)
//   if (item) return JSON.parse(item) as T
// }

// version sans GENERIC (avec unknown)
export const getLocalStorage = (key: string): unknown | null => {
	const item = localStorage.getItem(key)
	return item ? JSON.parse(item) : null
}

export const isMac = () => /mac/i.test(navigator.userAgent)
export const isWindows = () => /win/i.test(navigator.userAgent)
