import { useEffect } from "react"

export const useKeyboardShortucts = (shortcuts: Record<string, () => void>) => {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.metaKey || e.ctrlKey) {
				const action = shortcuts[e.key.toLowerCase()]
				if (action) {
					e.preventDefault()
					action()
				}
			}
		}
		window.addEventListener("keydown", handler)
		return () => window.removeEventListener("keydown", handler)
	}, [shortcuts])
}
