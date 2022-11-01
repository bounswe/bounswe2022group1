import * as React from "react";

export default function Profile() {
  const token = localStorage.getItem("token");
  if (token) {
    return <div>Token is ok</div>;
  } else {
    return <div>Token is not ok</div>;
  }
}
