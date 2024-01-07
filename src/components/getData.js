import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DateTimeForm from './dateTime';
import CarParkList from './carParkList';

function GetData() {
  const [carParks, setCarParks] = useState([]);
  const [dateTime, setDateTime] = useState(new Date().toISOString())
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDateTimeSubmit = (newDateTime) => {
    setDateTime(newDateTime)
  }

  useEffect(() => {
    if (dateTime) {
      getData(dateTime, setCarParks, setError, setLoading);
    }
  }, [dateTime])

  const getData = async () =>  {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.data.gov.sg/v1/transport/carpark-availability?date_time=${dateTime}`);
      if (response.data.items && response.data.items.length > 0) {
        let allCarParks = response.data.items.flatMap(item => item.carpark_data);
        let TenCarParks = allCarParks.slice(0, 10);
        setCarParks(TenCarParks);
      } else {
        setCarParks([]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
    };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>10 Car Park Availability</h1>
      <DateTimeForm onDateTimeSubmit={handleDateTimeSubmit} />
      <CarParkList carParks={carParks} />
    </div>
  );
}

export default GetData;
