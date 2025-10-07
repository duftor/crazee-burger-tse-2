import { getProductInputConfig } from "./productInputConfig"
import { useOrderContext } from "@/context/OrderContext"
import SavingMessage from "../EditForm/SavingMessage"
import EditInfoMessage from "../EditForm/EditInfoMessage"
import { useSuccessMessage } from "@/hooks/useSuccessMessage"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { ProductForm } from "./ProductForm"

export const EditProductForm = () => {
	const [valueOnFocus, setValueOnFocus] = useState<string>()
	const { productSelected, setProductSelected, handleEdit, categories, titleEditRef } = useOrderContext()
	const { isSubmitted: isSaved, displaySuccessMessage } = useSuccessMessage()
	const { username } = useParams()
	const inputConfig = getProductInputConfig(productSelected, categories)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target

		const productBeingUpdated = {
			...productSelected,
			[name]: value,
		}

		setProductSelected(productBeingUpdated)
		username && handleEdit(productBeingUpdated, username)
	}

	const handleOnFocus = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
		setValueOnFocus(event.target.value)

	const handleOnBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
		if (valueOnFocus !== event.target.value) displaySuccessMessage()
	}

	return (
		<ProductForm
			entity={productSelected}
			inputConfig={inputConfig}
			onChange={handleChange}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			refInput={titleEditRef}>
			{isSaved ? <SavingMessage /> : <EditInfoMessage />}
		</ProductForm>
	)
}
