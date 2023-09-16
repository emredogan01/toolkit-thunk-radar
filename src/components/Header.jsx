import React from 'react'
import { useSelector } from 'react-redux'
const Header = () => {
  const store= useSelector((store)=> store)
  console.log(store)
  return (
    <header>
        <div>
            <img src="/logo.png" />
            <h2>Uçus Radarı</h2>
        </div>

        <h4>
            {store.isLoading 
            ? "Uçuşlar hesaplanıyor..."
            : `${store.flights.length} Adet Uçus Bulundu`} 
        </h4>
    </header>
  )
}

export default Header