import React from "react"
import TextInput from "@/components/reusable-ui/TextInput"
import SelectInput from "@/components/reusable-ui/SelectInput"
import styled from "styled-components"
import { getInputConfig } from "./inputConfig"
import { Product } from "@/types/Product"
import { isTextInput } from "@/types/Inputs"

export type InputsProps = {
	product: Product
	// onChange: React.ChangeEventHandler<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement>
	onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
	onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>
}

export const Inputs = React.forwardRef<HTMLInputElement, InputsProps>(({ product, onChange, onFocus, onBlur }, ref) => {
	const inputTexts = getInputConfig(product)

	// affichage
	return (
		<InputsStyled>
			{inputTexts.map((inputsRow, rowId) => (
				<div className="row-inputs" key={rowId}>
					{inputsRow.map((input) =>
						isTextInput(input) ? (
							<TextInput
								{...input}
								key={input.id}
								onChange={onChange}
								version="minimalist"
								onFocus={onFocus}
								onBlur={onBlur}
								ref={ref && input.name === "title" ? ref : null}
							/>
						) : (
							<SelectInput
								{...input}
								key={input.id}
								onChange={onChange}
								onFocus={onFocus}
								onBlur={onBlur}
							/>
						)
					)}
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
