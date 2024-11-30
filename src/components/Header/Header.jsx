import React from "react";
import { ShoppingBag, ProfileBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const navItems = [
    {
      name: "About",
      slug: "/about",
      active: true,
    },
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <>
      <header className=" px-12 py-2 bg-[#fbfafb] z-20  ">
        <nav className="p-4 flex justify-between items-center relative">
          <div className="flex items-center ">
            <Link to="/">
              <img
                src="/shopnstuff.ico"
                alt="Shop & Stuff"
                
                className="h-20"
              />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="hidden md:block">
                  <button
                    onClick={() => navigate(item.slug)}
                    className=" px-6 py-2 duration-200 text-black hover:underline rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="hidden md:block">
                <ShoppingBag />
              </li>
            )}
            {authStatus && (
              <li>
                <ProfileBtn userData={userData} />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
