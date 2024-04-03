import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

function FImage({place}) {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className="bg-gray-500 mb-2 rounded-2xl flex" style={{height: isHover ? "17rem" : "16.4rem", width: isHover ? "18rem" : "17rem", transition: "0.2s"}} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {place.photos?.[0] && (
                <img className="rounded-2xl object-cover h-full w-full" src={'https://virbnb-server.vercel.app/Uploads/' + place.photos?.[0]} alt="" />
            )}
        </div>
    );
}

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data, ...response.data, ...response.data, ...response.data, ...response.data]);
        });
    }, []);
    return(
        <div className="mt-16 grid gap-x-6 gap-y-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
            {places.length > 0 && places.map(place => (
                <Link to={'/place/'+place._id} className="mb-4">
                    <div className="flex justify-center items-center" style={{height: "16.4rem", width: "17rem"}}>
                        <FImage place={place} />
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