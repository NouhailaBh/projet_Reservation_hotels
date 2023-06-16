import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

const MapComponent = ({ hotelId }) => {
  const mapContainerRef = useRef(null);
  const [hotelAddress, setHotelAddress] = useState('');

  useEffect(() => {
    const fetchHotelAddress = async () => {
      try {
        const timestamp = Date.now(); // Générer un timestamp aléatoire
        const response = await fetch(`http://localhost:4001/api/hotels/find/${hotelId}?timestamp=${timestamp}`);
        const data = await response.json();
        setHotelAddress(data.address);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'adresse de l\'hôtel :', error);
      }
    };

    fetchHotelAddress();
  }, [hotelId]);


useEffect(() => {
    if (hotelAddress) {
      const map = L.map(mapContainerRef.current).setView([0, 0], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
  
      const geocodeHotelAddress = async () => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(hotelAddress)}&format=json&addressdetails=1&limit=1`);
          const data = await response.json();
  
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            L.marker([lat, lon]).addTo(map);
            map.setView([lat, lon], 13);
          }
        } catch (error) {
          console.error('Erreur lors de la géocodification de l\'adresse de l\'hôtel :', error);
        }
      };
  
      geocodeHotelAddress();
    }
  }, [hotelAddress]);
  
  

  return <div ref={mapContainerRef} style={{ height: '400px' }}></div>;
};

export default MapComponent;
