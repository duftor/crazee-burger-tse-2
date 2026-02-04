import styled from "styled-components"
import { theme } from "@/theme/theme"
import Main from "./Main/Main"
import Navbar from "./Navbar/Navbar"
import { initialiseUserSession } from "./helpers/initialiseUserSession"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useOrderContext } from "@/context/OrderContext"
import { ShortcutsOverlay } from "./ShortcutsOverlay"
import { useKeyboardShortucts } from "@/hooks/useKeyboardShortcuts"

export default function OrderPage() {
	// state
	const { username } = useParams()
	const { setMenu, setBasket, setIsModeAdmin, setIsCollapsed, setCategories } = useOrderContext()

	const shortcuts: Record<string, () => void> = {
		i: () => setIsModeAdmin((prev) => !prev),
		j: () => setIsCollapsed((prev) => !prev),
	}

	useKeyboardShortucts(shortcuts)

	useEffect(() => {
		if (username) initialiseUserSession(username, setMenu, setBasket, setCategories)
	}, [])

	//affichage (render)
	return (
		<OrderPageStyled>
			<ShortcutsOverlay />
			<div className="container">
				<Navbar />
				<Main />
			</div>
		</OrderPageStyled>
	)
}

const OrderPageStyled = styled.div`
	background: ${theme.colors.greyBlue};
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.container {
		background: red;
		height: 95vh;
		width: 1400px;
		display: flex;
		flex-direction: column;
		border-radius: ${theme.borderRadius.extraRound};
	}
`
