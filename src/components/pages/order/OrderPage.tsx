import styled from "styled-components"
import { theme } from "@/theme/theme"
import Main from "./Main/Main"
import Navbar from "./Navbar/Navbar"
import { initialiseUserSession } from "./helpers/initialiseUserSession"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useOrderContext } from "@/context/OrderContext"
import { ShortcutsOverlay } from "./ShortcutsOverlay"

export default function OrderPage() {
	// state
	const { username } = useParams()
	const { setMenu, setBasket } = useOrderContext()

	// 1e possibilité : vérification via une condition dans le useEffect()
	// 2e possibilité : non-null assertion operator : "!"
	// 3e possibilité : fall-back value (valeur de secours), nullish coalescing (opérateur de coalescence des nuls)

	useEffect(() => {
		if (username) initialiseUserSession(username, setMenu, setBasket)
	}, [])

	//affichage (render)
	return (
		<OrderPageStyled>
			<div className="container">
				<Navbar />
				<Main />
				<ShortcutsOverlay />
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
		position: relative;
		background: red;
		height: 95vh;
		width: 1400px;
		display: flex;
		flex-direction: column;
		border-radius: ${theme.borderRadius.extraRound};
	}
`
