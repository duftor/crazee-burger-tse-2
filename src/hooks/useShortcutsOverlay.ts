import { useState } from "react"

export const useShortcutsOverlay = () => {
	const [isShortcutsOverlayVisible, setIsShortcutsOverlayVisible] = useState(true)

	const showShortcutsOverlay = () => {
		setIsShortcutsOverlayVisible(true)
	}

	const hideShortcutsOverlay = () => {
		setIsShortcutsOverlayVisible(false)
	}

	return { isShortcutsOverlayVisible, showShortcutsOverlay, hideShortcutsOverlay }
}
