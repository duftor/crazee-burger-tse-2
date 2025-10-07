import { GenericForm } from "@/components/reusable-ui/GenericForm"
import { Category } from "@/types/Category"
import SubmitButton from "../Form/SubmitButton"
import { useSuccessMessage } from "@/hooks/useSuccessMessage"
import { useOrderContext } from "@/context/OrderContext"
import { EMPTY_CATEGORY } from "@/constants/categories"
import { useParams } from "react-router-dom"
import { CategoryPreview } from "../Form/CategoryPreview"
import { getCategoryInputConfig } from "../Form/CategoryInputConfig"

type AddCategoryFormProps = {}

export const AddCategoryForm = ({}: AddCategoryFormProps) => {
	const { newCategory, setNewCategory, handleAddCategory } = useOrderContext()
	const { isSubmitted, displaySuccessMessage } = useSuccessMessage()
	const { username } = useParams()
	const inputConfig = getCategoryInputConfig(newCategory)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setNewCategory({ ...newCategory, [name]: value })
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!username) return

		const newCategoryToAdd = { ...newCategory, id: crypto.randomUUID() }
		// handleAddCategory(newCategoryToAdd, username)
		console.log("newCategoryToAdd", newCategoryToAdd)
		setNewCategory(EMPTY_CATEGORY)
		displaySuccessMessage()
	}

	return (
		<GenericForm<Category>
			entity={newCategory}
			inputConfig={inputConfig}
			onSubmit={handleSubmit}
			onChange={handleChange}
			PreviewComponent={CategoryPreview}>
			<SubmitButton isSubmitted={isSubmitted} label="Créer une nouvelle catégorie" />
		</GenericForm>
	)
}
