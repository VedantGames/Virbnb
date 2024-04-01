import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data, ...response.data, ...response.data, ...response.data, ...response.data]);
        });
    }, []);
    return(
        <div className="mt-16 grid gap-x-6 gap-y-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {places.length > 0 && places.map(place => (
                <Link to={'/place/'+place._id} className="mb-4">
                    <div className="bg-gray-500 mb-2 rounded-2xl flex" style={{height: "16.4rem", width: "17rem"}}>
                        {place.photos?.[0] && (
                            <img className="rounded-2xl object-cover" src={'http://localhost:4000/Uploads/' + place.photos?.[0]} alt="" />
                        )}
                    </div>
                    <h2 className="font-bold truncate">{place.title}</h2>
                    <h3 className="text-sm truncate text-gray-700">{place.address}</h3>
                    <h3 className="text-sm truncate text-gray-700">{place.checkIn}-{place.checkOut} In-Out time</h3>
                    <div>
                    <span className="font-semibold text-base text-gray-800">&#8377;{place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    )
}