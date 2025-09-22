import { AiOutlinePlus } from "react-icons/ai"
import { MdModeEditOutline } from "react-icons/md"
//@ts-ignore
import EditForm from "./AdminPanel/EditForm/EditForm"
//@ts-ignore
import HintMessage from "./AdminPanel/EditForm/HintMessage"
//@ts-ignore
import AddForm from "./AdminPanel/AddForm/AddForm"
import { TabType } from "@/types/Tab"
import { ADMIN_TAB_LABEL } from "@/constants/tab"

export const getTabsConfig = (hasAlreadyBeenClicked?: boolean): TabType[] => [
  {
    index: ADMIN_TAB_LABEL.ADD,
    label: "Ajouter un produit",
    Icon: <AiOutlinePlus />,
    Content: <AddForm />,
  },
  {
    index: ADMIN_TAB_LABEL.EDIT,
    label: "Modifier un produit",
    Icon: <MdModeEditOutline />,
    Content: hasAlreadyBeenClicked ? <EditForm /> : <HintMessage />,
  },
]

export const getTabSelected = (tabs: TabType[], currentTabSelected: ADMIN_TAB_LABEL) => {
  return tabs.find((tab) => tab.index === currentTabSelected)
}
