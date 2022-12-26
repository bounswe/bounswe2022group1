import Sidebar from "../../components/profile/Sidebar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// icons
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
// pages
import {
  PageOne,
  PageTwo,
  PageThree,
  ChangePasword,
} from "../../components/subpages";
import { useRouter } from "next/router";

const menus1 = [
  { id: 1, name: "Achievements", icon: <MailIcon />, page: <PageOne /> },
  { id: 2, name: "Notes", icon: <InboxIcon />, page: <PageTwo /> },
  { id: 3, name: "Learning Space's", icon: <MailIcon />, page: <PageThree /> },
  { id: 4, name: "Page 4", icon: <InboxIcon />, page: <PageOne /> },
  { id: 5, name: "Page 5", icon: <MailIcon />, page: <PageTwo /> },
  { id: 6, name: "Page 6", icon: <InboxIcon />, page: <PageThree /> },
];
const menus = [
  { id: 1, name: "Main Profile", icon: <MailIcon />, page: <PageOne /> },
  {
    id: 2,
    name: "Change Password",
    icon: <InboxIcon />,
    page: <PageTwo />,
  },
];

export default function Profile() {
  const { user } = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/homepage");
  });
  return <Sidebar menus={menus} />;
}
