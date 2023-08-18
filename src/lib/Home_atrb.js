const url = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getCoordinates = async (cityName) => {
  const req = await fetch(
    `${url}/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  );
  const response = await req.json();
  const data = response[0];
  return {
    lat: data?.lat,
    lon: data?.lon,
  };
};

export const fetchWeather = async (lat, lon) => {
  if (lat !== undefined && lon !== undefined) {
    const req = await fetch(
      `${url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const response = await req.json();
    return response;
  }
  return {};
};

export async function getWeather({ params }) {
  const cityName = params.cityName;
  const coordinates = await getCoordinates(cityName);
  const weather = await fetchWeather(coordinates.lat, coordinates.lon);
  
  if (Object.keys(weather).length === 0) {
    return { status: "wrong city" };
  }
  
  const {
    main: { temp, feels_like },
    wind: { speed: wind_speed },
    name,
    weather: [{ id }],
  } = weather;

  addToLocalStorage(name)
  
  return { temp, name, feels_like, wind_speed, id: String(id)[0] };
}

function addToLocalStorage(name) {
  const listOfCities = JSON.parse(localStorage.getItem("Cities")) || [];
  if (!listOfCities.includes(name)) {
    listOfCities.push(name);
    localStorage.setItem("Cities", JSON.stringify(listOfCities));
  }
}