import React from "react"
import TextInput from "@/components/reusable-ui/TextInput"
import SelectInput from "@/components/reusable-ui/SelectInput"
import styled from "styled-components"
import { getInputConfig } from "./inputConfig"
import { Product } from "@/types/Product"
import { isMultiSelectInput, isSelectInput, isTextInput } from "@/types/Inputs"
import { MultiSelect } from "@/components/reusable-ui/MultiSelect/MultiSelect"
import { useOrderContext } from "@/context/OrderContext"
import { Category } from "@/types/Category"
import { FormEvents } from "@/types/FormEvents"
import { MultiValue } from "react-select"

export type InputsProps = {
	product: Product
} & FormEvents

export const Inputs = React.forwardRef<HTMLInputElement, InputsProps>(({ product, onChange, onFocus, onBlur }, ref) => {
	const { categories } = useOrderContext()
	const inputTexts = getInputConfig(product, categories)

	const onChangeMulti = (selectedCategories: MultiValue<Category>) => {
		const eventMulti = {
			target: {
				name: "categories",
				value: selectedCategories,
			},
		} as unknown as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
		onChange && onChange(eventMulti)
	}

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
									onChange={onChangeMulti}
									placeholder="Catégorie (ex: Boisson)"
									menuPlacement="auto"
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
