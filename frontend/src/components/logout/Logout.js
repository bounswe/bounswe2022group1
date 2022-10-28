import * as React from "react";

export default function Logout() {
  const token = localStorage.getItem("token");
  console.log(token);
  let a = 0;
  if (token && a === 0) {
    fetch("http://3.89.218.253:8000/app/logout/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Failed with status code " + response.status);
          return response.json();
        } else {
          alert("Failed with status code " + response.status);
        }
      })
      .then((response) => {
        console.log(response);
        alert(" Success " + response.token);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.href = "/homepage";
    localStorage.removeItem("token");
    return;
  } else if (a === 0) {
    a = 1;
    return <div>You cannot logout now</div>;
  }
}
