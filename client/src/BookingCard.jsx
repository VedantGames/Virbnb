import React from 'react'

function BookingCard({place}) {
  
  return (
    <div>
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
                <input type="date" value={String(checkIn.getFullYear()) + '-' + String(checkIn.getMonth() + 1).padStart(2, '0') + '-' + String(checkIn.getDate()).padStart(2, "0")} onChange={(e) => setCheckIn(new Date(e.target.value))} className='text-gray-800 text-sm' />
              </div>
              <div className='border-0 border-b border-gray-400 w-full p-2'>
                <h1 className='font-bold' style={{fontSize: "0.68rem"}}>
                  CHECKOUT
                </h1>
                <input type="date" value={String(checkOut.getFullYear()) + '-' + String(checkOut.getMonth() + 1).padStart(2, '0') + '-' + String(checkOut.getDate()).padStart(2, "0")} onChange={(e) => setCheckOut(new Date(e.target.value))} className='text-gray-800 text-sm' />
              </div>
            </div>
            <div className='border-gray-400 w-full p-2 flex justify-between items-center'>
              <div>
                <h1 className='font-bold' style={{fontSize: "0.68rem"}}>
                  GUESTS
                </h1>
                <h3 className='text-gray-800 text-base -mt-1 mb-1'>
                  {guests} guest
                </h3>
              </div>
              <div className='flex text-gray-850'>
                <button className='bg-transparent'>
                  {guests < place.maxGuests && 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer" onClick={() => setGuests(guests+1)}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  }
                </button>
                <button className='bg-transparent'>
                  {guests > 1 &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer" onClick={() => setGuests(guests-1)}>
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
              <div className='flex justify-between border-0 border-b border-gray-400 p-3' onClick={() => setRefundable(false)}>
                <div>
                  <h1>
                    Non-refundable
                    <span className='text-xl'> · </span> 
                    ₹{nonRefundableTotal} total
                  </h1>
                </div>
                <div>
                  <button className={refundable ? 'border border-gray-500 rounded-full w-5 h-5 bg-transparent' : 'bg-transparent w-5 h-5 rounded-full border-4 border-black'}></button>
                </div>
              </div>
              <div className='p-3 flex justify-between items-center' onClick={() => setRefundable(true)}>
                <div>
                  <h1 className='mb-1'>
                    Refundable
                      <span className='text-xl'> · </span> 
                    ₹{refundableTotal} total
                  </h1>
                  <p className='text-gray-500' style={{fontSize: "0.75rem"}}>
                    Free cancellation before 2:00 pm on 31 Mar. <br />
                    Cancel before check-in on 1 Apr for partial refund
                  </p>
                </div>
                <div>
                  <button className={!refundable ? 'border border-gray-500 rounded-full w-5 h-5 bg-transparent' : 'bg-transparent w-5 h-5 rounded-full border-4 border-black'}></button>
                </div>
              </div>
            </div>
          </div>
          <button className='w-full h-12 rounded-md bg-primary text-white font-bold'>Reserve</button>
          <div className='flex justify-center my-3 text-base text-gray-600'>
            <h1>You won't be charged yet</h1>
          </div>
          <hr className='border-gray-300'/>
          <div className='mt-4 font-bold flex justify-between px-1'>
            <h1>
              Total before taxes
            </h1>
            <h2>
              ₹{total}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
