import { useState } from "react"
import { useNavigate } from "react-router-dom"


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
            <input type='text' onChange={handleChange} />
            <button onClick={onClick} >Find</button>
        </div>
    )
}