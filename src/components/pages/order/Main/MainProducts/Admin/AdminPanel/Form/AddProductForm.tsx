import { useOrderContext } from "@/context/OrderContext"
import { GenericForm } from "@/components/reusable-ui/GenericForm"
import { ImagePreview } from "@/components/reusable-ui/ImagePreview"
import { getProductInputConfig } from "./productInputConfig"
import { useParams } from "react-router-dom"
import { replaceFrenchCommaWithDot } from "@/utils/maths"
import { EMPTY_PRODUCT } from "@/constants/product"
import { Product } from "@/types/Product"
import { useSuccessMessage } from "@/hooks/useSuccessMessage"
import SubmitButton from "../AddForm/SubmitButton"

export function AddProductForm() {
	const { newProduct, setNewProduct, handleAdd } = useOrderContext()
	const { categories } = useOrderContext()
	const inputConfig = getProductInputConfig(newProduct, categories)
	const { username } = useParams()
	const { isSubmitted, displaySuccessMessage } = useSuccessMessage()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setNewProduct({ ...newProduct, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!username) return
		const newProductToAdd = {
			...newProduct,
			id: crypto.randomUUID(),
			price: replaceFrenchCommaWithDot(newProduct.price),
		}
		handleAdd(newProductToAdd, username)
		setNewProduct(EMPTY_PRODUCT)

		displaySuccessMessage()
	}

	return (
		<GenericForm<Product>
			entity={newProduct}
			inputConfig={inputConfig}
			PreviewComponent={ImagePreview}
			onChange={handleChange}
			onSubmit={handleSubmit}>
			<SubmitButton isSubmitted={isSubmitted} />
		</GenericForm>
	)
}
