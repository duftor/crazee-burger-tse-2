import { GenericForm } from "@/components/reusable-ui/GenericForm"
import { ImagePreview } from "@/components/reusable-ui/ImagePreview"
import { Product } from "@/types/Product"
import { InputConfig } from "@/types/Inputs"

type ProductFormProps = {
	entity: Product
	inputConfig: InputConfig[][]
	onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
	onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>
	onSubmit?: React.FormEventHandler<HTMLFormElement>
	children?: React.ReactNode
	refInput?: React.Ref<HTMLInputElement>
}

export const ProductForm = ({
	entity,
	inputConfig,
	onChange,
	onFocus,
	onBlur,
	onSubmit,
	children,
	refInput,
}: ProductFormProps) => {
	return (
		<GenericForm<Product>
			entity={entity}
			inputConfig={inputConfig}
			PreviewComponent={ImagePreview}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
			onSubmit={onSubmit}
			ref={refInput}>
			{children}
		</GenericForm>
	)
}
