import { FormEvents } from "@/types/FormEvents"
import { InputConfig, isMultiSelectInput, isSelectInput, isTextInput } from "@/types/Inputs"
import { forwardRef } from "react"
import { MultiValue } from "react-select"
import styled from "styled-components"
import TextInput from "./TextInput"
import SelectInput from "./SelectInput"
import { MultiSelect } from "./MultiSelect/MultiSelect"

type GenericInputsProps = FormEvents & {
	inputConfig: InputConfig[][]
}

export const GenericInputs = forwardRef(
	<Entity,>({ inputConfig, onChange, onFocus, onBlur }: GenericInputsProps, ref: React.Ref<HTMLInputElement>) => {
		const onChangeMulti = (name: string, value: MultiValue<Entity>) => {
			const eventMulti = {
				target: { name, value },
			} as unknown as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

			onChange?.(eventMulti)
		}

		return (
			<InputsStyled>
				{inputConfig.map((inputsRow, rowId) => (
					<div className="row-inputs" key={`row-${rowId}`}>
						{inputsRow.map((input) => {
							if (isTextInput(input)) {
								return (
									<TextInput
										{...input}
										key={input.id}
										version="minimalist"
										onChange={onChange}
										onFocus={onFocus}
										onBlur={onBlur}
										ref={input.name === "title" ? ref : null}
									/>
								)
							}

							if (isSelectInput(input)) {
								return (
									<SelectInput
										{...input}
										key={input.id}
										onChange={onChange}
										onFocus={onFocus}
										onBlur={onBlur}
									/>
								)
							}

							if (isMultiSelectInput(input)) {
								return (
									<MultiSelect<Entity>
										{...input}
										key={input.id}
										onChange={(selected) => onChangeMulti(input.name, selected)}
										placeholder={input.placeholder}
										menuPlacement="auto"
									/>
								)
							}

							return null
						})}
					</div>
				))}
			</InputsStyled>
		)
	}
) as (props: GenericInputsProps & { ref?: React.Ref<HTMLInputElement> }) => JSX.Element

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
