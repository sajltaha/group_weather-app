import { useState } from "react"
import { Link } from "react-router-dom"
import style from './Profile.module.css'

function Profile() {
    const [cities, setCities] = useState(JSON.parse(localStorage.getItem('Cities')))
    return (<>
        {(cities == null || cities.length == 0) && <p>Вы пока что ничего не искали!</p>}
        {(cities != null && cities.length != 0) &&
            <>
                <div className={style.list}>
                    {
                        cities.map((city) => {
                            return <Link className={style.a} key={Math.random()} to={`/${city}`}>{city}</Link>
                        })
                    }
                </div>
            </>
        }
    </>)
}

export default Profile