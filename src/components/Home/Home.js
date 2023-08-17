import { useEffect, useState } from "react";
import style from "./Home.module.css";
import {
  BsFillCloudDrizzleFill,
  BsFillCloudRainHeavyFill,
  BsFillCloudSnowFill,
  BsCloudSun,
} from "react-icons/bs";
import { WiSmoke } from "react-icons/wi";
import { MdThunderstorm } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { fetchWeather, getCoordinates } from "../../lib/Home_atrb";

const weatherIdIcon = {
  2: <MdThunderstorm />,
  3: <BsFillCloudDrizzleFill />,
  5: <BsFillCloudRainHeavyFill />,
  6: <BsFillCloudSnowFill />,
  7: <WiSmoke />,
  8: <BsCloudSun />,
};

export async function getWeather({ params }) {
  const cityName = params.cityName;
  const coordinates = await getCoordinates(cityName);
  const weather = await fetchWeather(coordinates.lat, coordinates.lon);

  if (!weather) {
    return { status: "not found" };
  }
  
  if (Object.keys(weather).length === 0) {
    return { status: "wrong city" };
  }
  
  const {
    main: { temp, feels_like },
    wind: { speed: wind_speed },
    name,
    weather: [{ id }],
  } = weather;

  const listOfCities = JSON.parse(localStorage.getItem("Cities")) || [];
  if (!listOfCities.includes(name)) {
    listOfCities.push(name);
    localStorage.setItem("Cities", JSON.stringify(listOfCities));
  }
  return { temp, name, feels_like, wind_speed, id: String(id)[0] };
}

function Home() {
  const weatherData = useLoaderData();

  if (!weatherData || weatherData.status === "not found") {
    return <p className={style.empty__home}>Вы не указали город</p>;
  }

  if (weatherData.status === "wrong city") {
    return <p className={style.empty__home}>Вы указали неправильный город</p>;
  }

  return (
    <div className={style.info}>
      <div>{weatherIdIcon[weatherData.id]}</div>
      <p className={style.city}>{weatherData.name}</p>
      {weatherData.temp && (
        <div className={style.char}>
          <p>Temperature ~ {weatherData.temp} C</p>
          <p>Feels like ~ {weatherData.feels_like} C</p>
          <p>Wind speed ~ {weatherData.wind_speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Home;