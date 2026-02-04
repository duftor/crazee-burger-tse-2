import styled from "styled-components"
import { useOrderContext } from "@/context/OrderContext"
import { theme } from "@/theme/theme"
import Admin from "./Admin/Admin"
import LoadingMessage from "./CatalogProducts/LoadingMessage"
import { Filters } from "./Filters"
import { CatalogProducts } from "./CatalogProducts/CatalogProducts"

export default function MainProducts() {
	const { isModeAdmin, menu } = useOrderContext()

	return (
		<MainProductsStyled>
			{menu === undefined ? (
				<LoadingMessage />
			) : (
				<div className="filters-and-catalog-products">
					<Filters />
					<CatalogProducts />
				</div>
			)}
			{isModeAdmin && <Admin />}
		</MainProductsStyled>
	)
}

const MainProductsStyled = styled.div`
	position: relative;
	overflow-y: hidden;
	display: grid;
	box-shadow: ${theme.shadows.strong};

	.filters-and-catalog-products {
		overflow-x: hidden;
	}
`
