import style from "./WeatherInfo.module.css";
import {
  BsFillCloudDrizzleFill,
  BsFillCloudRainHeavyFill,
  BsFillCloudSnowFill,
  BsCloudSun,
} from "react-icons/bs";
import { WiSmoke } from "react-icons/wi";
import { MdThunderstorm } from "react-icons/md";

const weatherIdIcon = {
  2: <MdThunderstorm />,
  3: <BsFillCloudDrizzleFill />,
  5: <BsFillCloudRainHeavyFill />,
  6: <BsFillCloudSnowFill />,
  7: <WiSmoke />,
  8: <BsCloudSun />,
};

export default function WeatherInfo({ weatherData }) {
  return (
    <>
      <div className={style.info}>
        <div>{weatherIdIcon[weatherData.id]}</div>
        <p className={style.char}>{weatherData.name}</p>
        {weatherData.temp && (
          <div className={style.char}>
            <p>Temperature ~ {weatherData.temp} C</p>
            <p>Feels like ~ {weatherData.feels_like} C</p>
            <p>Wind speed ~ {weatherData.wind_speed} m/s</p>
          </div>
        )}
      </div>
    </>
  );
}
