import { createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider } from "react-router-dom";
import Home, { getWeather } from "./components/Home/Home";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import { BsSearch } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiHomeAlt2 } from 'react-icons/bi'
import style from './App.module.css'
import { useState } from "react";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path='/:cityName' element={<Home />} loader={getWeather} />
    <Route path='/search' element={<Search />} />
    <Route path='/profile' element={<Profile />} />
  </Route>
))

function RootLayout() {
  const [isActive, setIsActive] = useState(false)

  function handleClick() {
    setIsActive(!isActive)
  }
  return <>
    <div className={style.card}>
      <div className={style.card_header}>
        <div>
          <div onClick={handleClick} className={style.item}><GiHamburgerMenu /></div>
          <Link style={{ display: isActive ? 'block' : 'none', textDecoration: 'none', color: 'black' }} to='/profile'>Profile</Link>
        </div>
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
