import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
        axios.get('/user-places/'+user._id).then(({data}) => {
            setPlaces(data);
        })
    }, []);
    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link> 
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/'+place._id} key={place._id} className="h-60 flex bg-gray-200 rounded-2xl overflow-hidden mb-2">
                        <div>
                            <div className="h-full w-80">
                                <img src={'https://virbnb-server.vercel.app/Uploads/' + place.photos[0]} alt="" className="h-full w-full object-cover" />
                            </div>
                        </div>
                        <div className="ml-2 mr-12 my-4">
                            <h2 className="text-3xl">{place.title}</h2>
                            <p className="test-base mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}