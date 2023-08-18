import { BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiHomeAlt2 } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <>
      <div className={style.card_header}>
        <div>
          <div onClick={handleClick} className={style.item}>
            <GiHamburgerMenu />
          </div>
          <Link
            style={{
              display: isActive ? "block" : "none",
              textDecoration: "none",
              color: "black",
            }}
            to="/profile"
          >
            Profile
          </Link>
        </div>
        <Link className={style.item} to="/">
          <BiHomeAlt2 />
        </Link>
        <Link className={style.item} to="/search">
          <BsSearch />
        </Link>
      </div>
    </>
  );
}
