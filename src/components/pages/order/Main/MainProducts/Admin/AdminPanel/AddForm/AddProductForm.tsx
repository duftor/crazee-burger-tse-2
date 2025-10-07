import { useOrderContext } from "@/context/OrderContext"
import { getProductInputConfig } from "../Form/productInputConfig"
import { useParams } from "react-router-dom"
import { replaceFrenchCommaWithDot } from "@/utils/maths"
import { EMPTY_PRODUCT } from "@/constants/product"
import { useSuccessMessage } from "@/hooks/useSuccessMessage"
import SubmitButton from "./SubmitButton"
import { ProductForm } from "../Form/ProductForm"

export function AddProductForm() {
	const { newProduct, setNewProduct, handleAdd, categories } = useOrderContext()
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
		<ProductForm entity={newProduct} inputConfig={inputConfig} onChange={handleChange} onSubmit={handleSubmit}>
			<SubmitButton isSubmitted={isSubmitted} />
		</ProductForm>
	)
}
