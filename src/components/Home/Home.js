import { useEffect, useState } from "react";
import style from './Home.module.css'
import { BsFillCloudDrizzleFill, BsFillCloudRainHeavyFill, BsFillCloudSnowFill, BsCloudSun } from 'react-icons/bs'
import { WiSmoke } from 'react-icons/wi'
import { MdThunderstorm } from 'react-icons/md'
import { useLoaderData } from "react-router-dom";

const url = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY

const getCoordinates = async (cityName) => {
    const req = await fetch(`${url}/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
    const response = await req.json()
    const data = response[0]
    return {
        lat: data?.lat,
        lon: data?.lon
    }
}

const fetchWeather = async (lat, lon) => {
    if (lat !== undefined && lon !== undefined) {
        const req = await fetch(`${url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        const response = await req.json()
        return response
    }
    return {}
}

export async function getWeather({ params }) {
    const cityName = params.cityName
    const coordinates = await getCoordinates(cityName)
    const weather = await fetchWeather(coordinates.lat, coordinates.lon)
    return weather
}

function Home() {
    const [weather, setWeather] = useState({ temp: undefined, feels_like: undefined, wind_speed: undefined, name: undefined, id: undefined })

    const weatherIdIcon = {
        2: <MdThunderstorm />,
        3: <BsFillCloudDrizzleFill />,
        5: <BsFillCloudRainHeavyFill />,
        6: <BsFillCloudSnowFill />,
        7: <WiSmoke />,
        8: <BsCloudSun />
    }

    const loaderData = useLoaderData()
    useEffect(() => {
        if (loaderData !== undefined) {
            if (Object.keys(loaderData).length !== 0) {
                setWeather({ temp: loaderData?.main?.temp, feels_like: loaderData?.main?.feels_like, wind_speed: loaderData?.wind?.speed, name: loaderData?.name, id: loaderData?.weather[0]?.id.toString()[0] })
            }
            else {
                setWeather({})
            }
        }
        else {
            console.log(1)
            setWeather(undefined)
        }
    }, [loaderData])

    return (
        <>
            {(weather !== undefined && Object.keys(weather).length === 0) && <p className={style.empty__home}>Вы указали неправильный город</p>}
            {weather == undefined && <p className={style.empty__home}>Вы не указали город</p>}
            {(weather !== undefined && Object.keys(weather).length !== 0) &&
                <>
                    <div className={style.info}>
                        <div>{weatherIdIcon[weather.id]}</div>
                        <p className={style.city}>{weather.name}</p>
                        <div>
                            {weather.temp !== undefined ?
                                <div className={style.char}>
                                    <p>Temperature ~ {weather.temp} C</p>
                                    <p>Feels like ~ {weather.feels_like} C</p>
                                    <p>Wind speed ~ {weather.wind_speed} m/s</p>
                                </div> : ''}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Home;