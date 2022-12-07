import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Logout() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
    router.push("/homepage");
  });
  return;
}
