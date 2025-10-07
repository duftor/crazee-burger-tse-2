import { AiOutlinePlus } from "react-icons/ai"
import { MdModeEditOutline } from "react-icons/md"
import HintMessage from "./AdminPanel/EditForm/HintMessage"
import { TabType } from "@/types/Tab"
import { ADMIN_TAB_LABEL } from "@/constants/tab"
import { IoPricetag } from "react-icons/io5"
import { AddProductForm } from "./AdminPanel/AddForm/AddProductForm"
import { EditProductForm } from "./AdminPanel/EditForm/EditProductForm"
import { AddCategoryForm } from "./AdminPanel/AddCategory/AddCategoryForm"

export const getTabsConfig = (hasAlreadyBeenClicked?: boolean): TabType[] => [
	{
		index: ADMIN_TAB_LABEL.ADD_PRODUCT,
		label: "Ajouter un produit",
		Icon: <AiOutlinePlus />,
		Content: <AddProductForm />,
	},
	{
		index: ADMIN_TAB_LABEL.EDIT_PRODUCT,
		label: "Modifier un produit",
		Icon: <MdModeEditOutline />,
		Content: hasAlreadyBeenClicked ? <EditProductForm /> : <HintMessage />,
	},
	{
		index: ADMIN_TAB_LABEL.ADD_CATEGORY,
		label: "Créer une catégorie",
		Icon: <IoPricetag />,
		Content: <AddCategoryForm />,
	},
]

export const getTabSelected = (tabs: TabType[], currentTabSelected: ADMIN_TAB_LABEL) => {
	return tabs.find((tab) => tab.index === currentTabSelected)
}
