import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

function BookingPage() {
  const {id:bookingId} = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [place, setPlace] = useState(null);
  const [placeOwner, setPlaceOwner] = useState('');
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get('/bookings/'+bookingId).then(responce => {
      setBookingDetails(responce.data);
    })
  }, [bookingId]);

  useEffect(() => {
    if (bookingDetails) {
      axios.get('/places/'+bookingDetails.placeId).then(({data: placeDetails}) => {
        setPlace(placeDetails);
        console.log(place);
      })
    }
  }, [bookingDetails]);

  useEffect(() => {
    if (place) {
      axios.get('/findowner/'+place.owner).then(res => {
        const {name} = res.data;
        setPlaceOwner(name);
      })
    }
  }, [place]);

  function cancel() {
    axios.get('/cancel/'+bookingId).then(() => {
      setRedirect(true);
    });
  }

  if (redirect) return <Navigate to={'/account/bookings/'} />

  if (showAllPhotos) {
    return (
      <div className='absolute inset-0 bg-black text-white min-h-screen'>
        <div className='bg-black grid gap-4'>
          <div>
            <h2 className='text-3xl ml-40 mt-8'>Photos of {place.title}</h2>
            <button onClick={() => {setShowAllPhotos(false)}} className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 && place.photos.map(photo => (
            <div key={photo} className='flex justify-center'>
              <img src={'http://localhost:4000/Uploads/'+photo} className='-ml-40' alt="" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
    {place && (
      <>
        <hr className='mt-4 -mx-20 '/>
        <div className='-mx-20 px-96 py-4'>
          <h1 className='text-3xl mb-4'>{place.title}</h1>
          <div className="relative mb-8 cursor-pointer" onClick={() => setShowAllPhotos(true)}>
            <div className="grid gap-2 grid-cols-2 rounded-2xl overflow-hidden h-[32rem]">
              <div>
                {place.photos?.[0] && (
                  <div className='size-full'>
                    <img className='object-cover size-full'src={'http://localhost:4000/Uploads/'+place.photos[0]} alt="" />
                  </div>
                )}
              </div>
              <div>
                <div className='grid grid-cols-2 grid-rows-2 gap-2 size-full'>
                  <div className=' size-full'>
                    {place.photos?.[1] && (
                        <img className='object-cover size-full' src={'http://localhost:4000/Uploads/'+place.photos[1]} alt="" />
                    )}
                  </div>
                  <div className=' size-full'>
                    {place.photos?.[3] && (
                        <img className='object-cover size-full' src={'http://localhost:4000/Uploads/'+place.photos[3]} alt="" />
                    )}
                  </div>
                  <div className=' size-full'>
                    {place.photos?.[2] && (
                        <img className='object-cover size-full' src={'http://localhost:4000/Uploads/'+place.photos[2]} alt="" />
                    )}
                  </div>
                  <div className=' size-full'>
                    {place.photos?.[4] && (
                        <img className='object-cover size-full' src={'http://localhost:4000/Uploads/'+place.photos[4]} alt="" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className='absolute flex gap-1 bottom-4 right-2 py-1.5 px-3.5 bg-white rounded-lg shadow-md shadow-gray-500 border border-black text-base text-center text-gray-800'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              Show more photos
            </button>
          </div>
        </div>
        <div className='grid grid-cols-[2fr_1fr] mx-72'>
          <div className='mr-24'>
            <h1 className='text-2xl font-medium'>{place.address}</h1>
            <h3 className='font-medium -mt-1'>
              {place.maxGuests} 
              guests
              <span className='text-xl'> · </span>
              6 bedrooms
              <span className='text-xl'> · </span>
              7 beds
              <span className='text-xl'> · </span>
              6 bathrooms
            </h3>
            <h1 className='flex font-semibold underline text-gray-900 mt-1'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              1 review
            </h1>
            <div className='mt-8'>
              <hr className='border-gray-300' />
              <div className='flex my-8 ml-1'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-15 h-10">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
                <div className='-mt-1 ml-4'>
                  <h1 className='font-bold text-base text-gray-800'>
                    Hosted by { placeOwner }
                  </h1>
                  <h2 className='text-gray-500'>
                  Superhost · 1 year hosting
                  </h2>
                  </div>
                  </div>
                  </div>
                  <div>
                  <hr className='border-gray-300' />
                  <div className='my-8 text-gray-700 text-base'>
                {place.description}
              </div>
              <span className='flex cursor-pointer' onClick={() => setShowExtraInfo(true)}>
                <h1 className='font-bold underline'>
                  Show more
                </h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5 mt-0.5 font-bold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                  </span>
            </div>
            { showExtraInfo && 
              //TODO Improve Thiss!!!
              <div>
                <div className='fixed h-full w-full opacity-50 bg-gray-950 left-0 top-0'>
                </div>
                <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full rounded-2xl'>
                  <div className='h-auto bg-white rounded-2xl p-6' style={{width: '40%'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setShowExtraInfo(false)}>
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    <h1>
                      #
                      {place.extraInfo}
                    </h1>
                  </div>
                </div>
              </div>
            }
          </div>
          <div>
            <div className='border border-gray-200 rounded-2xl h-auto p-6 shadow-2xl'>
              <div className=' mb-4'>
                <span className='font-bold text-gray-800 text-2xl mr-1' style={{fontFamily: "inherit"}}>
                  ₹{place.price} 
                </span>
                <span className='text-base'>
                  night
                </span>
              </div>
              <div className='flex flex-col border border-gray-400 rounded-md my-2 overflow-hidden'>
                <div className='flex'>
                    <div className='border-0 border-r border-b border-gray-400 w-full p-2'>
                    <h1 className='font-bold' style={{fontSize: "0.68rem"}}>
                      CHECK-IN
                    </h1>
                    <h1 className='mr-1 mt-0.5'>{bookingDetails.checkIn.slice(0, 10)}</h1>
                  </div>
                  <div className='border-0 border-b border-gray-400 w-full p-2'>
                    <h1 className='font-bold' style={{fontSize: "0.68rem"}}>
                      CHECKOUT
                    </h1>
                    <h1 className='mt-0.5'>{bookingDetails.checkOut.slice(0, 10)}</h1>
                    </div>
                </div>
                <div className='border-gray-400 w-full p-2 flex justify-between items-center'>
                  <div>
                    <h1 className='font-bold' style={{fontSize: "0.68rem"}}>
                      GUESTS
                    </h1>
                    <h3 className='text-gray-800 text-base -mt-1 mb-1'>
                    {bookingDetails.guests} guest
                    </h3>
                  </div>
                  <div className='flex text-gray-850'>
                    <button className='bg-transparent'>
                      {place.guests < place.maxGuests && 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer" onClick={() => setGuests(place.guests+1)}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      }
                    </button>
                    <button className='bg-transparent'>
                      {place.guests > 1 &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer" onClick={() => setGuests(place.guests-1)}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      }
                    </button>
                  </div>
                </div>
              </div>
              <div className='my-4'>
                <h1 style={{fontSize: "0.6rem", fontWeight: "600"}}>
                  CANCELLATION POLICIES
                </h1>
                <div className='border text-gray-700 border-gray-400 rounded-md my-2 cursor-pointer' style={{fontSize: "0.9rem"}}>
                  <div className='p-2 py-4 text-black flex gap-2'>
                    <h1>Cancellation type: </h1>
                    <h1 className='text-gyar-500'>{bookingDetails.refundable ? 'Refundable' : 'Non-Refundable'}</h1>
                  </div>
                </div>
              </div>
              <button className='w-full h-12 rounded-md bg-primary text-white font-bold' onClick={() => setConfirmCancel(true)}>Cancel</button>
              <div className='flex justify-center my-3 text-base text-gray-600'>
              </div>
              <hr className='border-gray-300'/>
              <div className='mt-4 font-bold flex justify-between px-1'>
                <h1>
                  Total before taxes
                  </h1>
                  <h2>
                  ₹{bookingDetails.total}
                  </h2>
                  </div>
                  </div>
          </div>
          {confirmCancel  && 
            <div>
              <div className='fixed h-full w-full bg-gray-900 opacity-30 top-0 left-0'></div>
              <div className='fixed top-0 left-0 h-full w-full flex justify-center items-center'>
                <div className='flex flex-col h-auto w-auto bg-white py-8 px-14 rounded-xl shadow-2xl shadow-gray-900'>
                <button className='bg-primary mb-4 px-14 py-3 rounded-lg' onClick={cancel}>Confirm</button>
                <button className='border-4 border-primary px-14 py-2 bg-gray-300 rounded-lg' onClick={() => setConfirmCancel(false)}>Cancel</button>
                </div>
                </div>
                </div>
              }
              </div>
              </>
          )}
          </>
        );
}

export default BookingPage
