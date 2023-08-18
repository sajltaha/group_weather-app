import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import style from "./Profile.module.css";

function Profile() {
  const citiesFromLocalStorage = JSON.parse(localStorage.getItem("Cities"));
  const [cities, setCities] = useState(citiesFromLocalStorage || []);

  return (
    <Container>
      <div>
        {cities.length === 0 ? (
          <p>Вы пока что ничего не искали!</p>
        ) : (
          <div className={style.list}>
            {cities.map((city) => (
              <Link className={style.a} key={city} to={`/${city}`}>
                {city}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Profile;
