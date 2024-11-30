import React from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  // const navigate = useNavigate();
  // const accountHandler = () => {
  //   navigate("/account");
  // };

  return (
    <button
      className="px-6 py-2 duration-200 text-black flex items-center "
      // onClick={accountHandler}
    >
      
      <FiUser className="mr-1" />
      Account
    </button>
  );
}

export default LogoutBtn;
