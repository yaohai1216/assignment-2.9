import React from 'react'
function CarParkList({ carParks }) {
  if (!carParks.length) return <p>No car park data available.</p>

  return (
    <ul>
      {carParks.map((carpark, index) => (
        <li key={index}>
          <strong>{carpark.carpark_number}</strong> - Updated at:{' '}
          {carpark.update_datetime}
          <ul>
            {carpark.carpark_info.map((info, infoIndex) => (
              <li key={infoIndex}>
                Total Lots: {info.total_lots}, Available: {info.lots_available},
                Type: {info.lot_type}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}


export default CarParkList