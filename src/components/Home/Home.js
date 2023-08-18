import style from "./Home.module.css";
import { useLoaderData } from "react-router-dom";
import Container from "../Container/Container";
import WeatherInfo from "../WeatherInfo/WeatherInfo";

function Home() {
  const weatherData = useLoaderData();
  return (
    <Container>
      {!weatherData && (
        <p className={style.empty__home}>Вы не указали город!</p>
      )}
      {(weatherData && weatherData.status === "wrong city") && (
        <p className={style.empty__home}>Вы указали неправильный город!</p>
      )}
      {(weatherData && !weatherData.status) && (
        <WeatherInfo weatherData={weatherData} />
      )}
    </Container>
  );
}

export default Home;
