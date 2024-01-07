import React from 'react'

export function DateTimeForm ({ onDateTimeSubmit }) {
  const handleRefresh = e => {
    e.preventDefault()
    const currentDateTime = new Date().toISOString() // Get current date and time
    onDateTimeSubmit(currentDateTime) // Pass the current date-time up to the parent component
  }

  return (
    <form onSubmit={handleRefresh} className='form-container'>
      <button type='submit' className='refresh-button'>
        Refresh Data
      </button>
    </form>
  )
}

export default DateTimeForm
