import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    )
}

export default LoadingSpinner