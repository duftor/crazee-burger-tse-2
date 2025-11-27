import { ChangeHandler, FocusHandler } from "@/types/FormEvents"
import { InputConfig } from "@/types/Inputs"
import { ComponentType, FormEvent, forwardRef, PropsWithChildren } from "react"
import styled from "styled-components"
import { GenericInputs } from "./GenericInputs"

type GenericFormProps<Entity> = {
	entity: Entity
	inputConfig: InputConfig[][]
	PreviewComponent: ComponentType<{ entity: Entity }>
	onSubmit?: (event: FormEvent<HTMLFormElement>) => void
	onChange?: ChangeHandler
	onFocus?: FocusHandler
	onBlur?: FocusHandler
} & PropsWithChildren

export const GenericForm = forwardRef<HTMLInputElement, GenericFormProps<unknown>>(
	<Entity,>(
		{
			entity,
			inputConfig,
			PreviewComponent,
			onSubmit,
			onChange,
			onFocus,
			onBlur,
			children,
		}: GenericFormProps<Entity>,
		ref: React.Ref<HTMLInputElement>
	) => {
		return (
			<FormStyled onSubmit={onSubmit}>
				<PreviewComponent entity={entity} />
				<GenericInputs
					inputConfig={inputConfig}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					ref={ref}
				/>
				<div className="form-footer">{children}</div>
			</FormStyled>
		)
	}
) as <Entity>(props: GenericFormProps<Entity> & { ref?: React.Ref<HTMLInputElement> }) => JSX.Element

const FormStyled = styled.form`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: repeat(4, 1fr);
	height: 100%;
	width: 100%;
	grid-column-gap: 20px;
	grid-row-gap: 8px;

	.form-footer {
		grid-area: 4 / -2 / -1 / -1;
		display: flex;
		align-items: center;
		position: relative;
		top: 3px;
	}
`
