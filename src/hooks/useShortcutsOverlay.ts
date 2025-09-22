import { getLocalStorage, setLocalStorage } from "@/utils/window"
import { useState } from "react"

export const useShortcutsOverlay = () => {
	const [isShortcutsOverlayVisible, setIsShortcutsOverlayVisible] = useState(() => {
		const item = getLocalStorage("isShortcutsOverlayVisible")
		if (typeof item !== "boolean") return true

		return item
	})

	const showShortcutsOverlay = () => setIsShortcutsOverlayVisible(true)

	const hideShortcutsOverlay = () => {
		setIsShortcutsOverlayVisible(false)
		setLocalStorage("isShortcutsOverlayVisible", false)
	}

	return { isShortcutsOverlayVisible, showShortcutsOverlay, hideShortcutsOverlay }
}
