import { createBrowserRouter, createRoutesFromElements, Link, Outlet, Route, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import { BsSearch } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiHomeAlt2 } from 'react-icons/bi'
import style from './App.module.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<RootLayout />}>
    <Route path='/:cityName' element={<Home />} />
    <Route path='/search' element={<Search />} />
    <Route path='/profile' element={<ProfilePage />} />
  </Route>
))

function ProfilePage() {
  return <h1>Profile</h1>
}

function RootLayout() {
  return <>
    <div className="container">
      <div className={style.card}>
        <Link className={style.item} to='/profile'><GiHamburgerMenu /></Link>
        <Link className={style.item} to='/'><BiHomeAlt2 /></Link>
        <Link className={style.item} to='/search'><BsSearch /></Link>
      </div>
      <Outlet />
    </div>
  </>
}

function App() {
  return <RouterProvider router={router} />
}

export default App;
