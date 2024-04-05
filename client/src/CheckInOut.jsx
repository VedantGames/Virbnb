import React, { useState } from 'react'

function Calender({start, date, date2, setCheckOut}) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const [startSelectedDate, setStartSelectedDate] = useState(date);
  const [endSelectedDate, setEndSelectedDate] = useState(date);

  return (
    <div>
      <div>
        <div>
          <div className='flex gap-6 text-xs text-gray-500 font-normal my-5'>
            {days.map((day) => (
              <h1 key={day}>{day}</h1>
            ))}
          </div>
          <div className='grid grid-cols-7 ml-1'>
            {[...Array(lastDate+startDay)].map((n, i) => i<startDay ? null : i-startDay+1).map((d) => (
                <h1 className={new Date(date.getFullYear(), date.getMonth(), d).toDateString() == (start ? startSelectedDate.toDateString() : endSelectedDate.toDateString()) ? "h-12 w-12 cursor-pointer flex justify-center items-center rounded-full text-white bg-stone-800 shadow-lg" : startSelectedDate <= new Date(date.getFullYear(), date.getMonth(), d) && new Date(date.getFullYear(), date.getMonth(), d) <= endSelectedDate ? "h-12 w-12 cursor-pointer flex justify-center items-center bg-gray-300 hover:border hover:shadow-lg hover:rounded-2xl" : 'h-12 w-12 cursor-pointer flex justify-center items-center rounded-full hover:border hover:shadow-lg'} onClick={() => {start ? setStartSelectedDate(new Date(date.getFullYear(), date.getMonth(), d)) : setEndSelectedDate(new Date(date.getFullYear(), date.getMonth(), d)); start ? setCheckOut(true) : setCheckOut(false)}}>{d}</h1> 
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckInOut({setCheckOut}) {
  const date = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const nextMonth = monthNames[date.getMonth()+1];
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth()+1, 0));

  return (
    <div className='absolute top-24 shadow-xl bg-white shadow-gray-500 border border-gray-200 rounded-2xl py-6 px-10'>
      <div className='flex flex-col items-center'>
        <div className='h-9 w-28 flex justify-center items-center bg-white border border-gray-200 rounded-full shadow-lg'>
          <h1 className='font-semibold'>
            Dates
          </h1>
        </div>
        <div className='flex gap-8'>
          <div className=''>
            <div className='flex justify-center my-2'>
              <h1 className='font-semibold text-gray-800 text-base'>
                {month} {date.getFullYear()}
              </h1>
            </div>
            <div>
              <Calender start={true} date={startDate} date2={endDate} setCheckOut={setCheckOut} />
            </div>
          </div>
          <div>
            <div className='flex justify-center my-2'>
              <h1 className='font-semibold text-gray-800 text-base'>
                {nextMonth} {date.getFullYear()}
              </h1>
            </div>
            <Calender start={false} date={endDate} date2={startDate} setCheckOut={setCheckOut} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckInOut
