import React from "react"
import TextInput from "@/components/reusable-ui/TextInput"
import SelectInput from "@/components/reusable-ui/SelectInput"
import styled from "styled-components"
import { getInputConfig } from "./inputConfig"
import { Product } from "@/types/Product"
import { isMultiSelectInput, isSelectInput, isTextInput } from "@/types/Inputs"
import { MultiSelect } from "@/components/reusable-ui/MultiSelect"
import { useOrderContext } from "@/context/OrderContext"
import { Category } from "@/types/Category"
import { Chip } from "@/components/reusable-ui/Chip"

export type InputsProps = {
	product: Product
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
	onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>
}

export const Inputs = React.forwardRef<HTMLInputElement, InputsProps>(({ product, onChange, onFocus, onBlur }, ref) => {
	const { categories } = useOrderContext()
	const inputTexts = getInputConfig(product, categories)

	// affichage
	return (
		<InputsStyled>
			{inputTexts.map((inputsRow, rowId) => (
				<div className="row-inputs" key={"row-" + rowId}>
					{inputsRow.map((input) => {
						if (isTextInput(input))
							return (
								<TextInput
									{...input}
									key={input.id}
									onChange={onChange}
									version="minimalist"
									onFocus={onFocus}
									onBlur={onBlur}
									ref={ref && input.name === "title" ? ref : null}
								/>
							)
						else if (isSelectInput(input))
							return (
								<SelectInput
									{...input}
									key={input.id}
									onChange={onChange}
									onFocus={onFocus}
									onBlur={onBlur}
								/>
							)
						else if (isMultiSelectInput(input))
							return (
								<MultiSelect<Category>
									{...input}
									key={input.id}
									value={product.categories}
									onChange={onChange}
									OptionComponent={(option) => <Chip {...option} variant="hoverable" />}
								/>
							)
						else return null
					})}
				</div>
			))}
		</InputsStyled>
	)
})

const InputsStyled = styled.div`
	grid-area: 1 / 2 / -2 / 3;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.row-inputs {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 8px;
	}
`
