import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from './Search.module.css'

export default function Search() {
    const navigate = useNavigate()

    const [cityName, setCityName] = useState('')

    const handleChange = e => {
        setCityName(e.target.value)
    }

    const onClick = () => {
        navigate(`/${cityName}`)
    }

    return (
        <div>
            <input className={style.input_search} placeholder='City name' type='text' onChange={handleChange} />
            <button className={style.btn_find} onClick={onClick} >Find</button>
        </div>
    )
}