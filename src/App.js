import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import style from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import { getWeather } from "./lib/Home_atrb";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/:cityName" element={<Home />} loader={getWeather} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

function RootLayout() {
  return (
    <>
      <div className={style.card}>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
