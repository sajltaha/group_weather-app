import { createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider } from "react-router-dom";
import Home, { getWeather } from "./components/Home/Home";
import Search from "./components/Search/Search";
import { BsSearch } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiHomeAlt2 } from 'react-icons/bi'
import style from './App.module.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path='/:cityName' element={<Home />} loader={getWeather} />
    <Route path='/search' element={<Search />} />
    <Route path='/profile' element={<ProfilePage />} />
  </Route>
))

function ProfilePage() {
  return <h1>Profile</h1>
}

function RootLayout() {
  return <>
    <div className={style.card}>
      <div className={style.card_header}>
        <Link className={style.item} to='/profile'><GiHamburgerMenu /></Link>
        <Link className={style.item} to='/'><BiHomeAlt2 /></Link>
        <Link className={style.item} to='/search'><BsSearch /></Link>
      </div>
      <div className={style.card_body}>
        <Outlet />
      </div>
    </div>
  </>
}

function App() {
  return <RouterProvider router={router} />
}

export default App;
