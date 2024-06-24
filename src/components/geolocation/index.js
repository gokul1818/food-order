// src/GeolocationComponent.js
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { updateLocationMatch } from "../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

const GeolocationComponent = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState([]);
  const [locationsData, setLocationdata] = useState([]);
  const [match, setMatch] = useState(false);
  const hotelId = useSelector((state) => state.auth.hotelId);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // console.log(lat, lon);
        setLocation([lat, lon]);
        fetchLocations([lat, lon]);
      },
      (error) => {}
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = (lat1 * Math.PI) / 180; // Convert latitude 1 to radians
    const φ2 = (lat2 * Math.PI) / 180; // Convert latitude 2 to radians
    const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Difference in latitude
    const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Difference in longitude

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const fetchLocations = async (coord) => {
    const hotelRef = collection(db, "hotels");
    const unsubscribeHotel = onSnapshot(hotelRef, (snap) => {
      const data = snap.docs.map((x) => ({
        ...x.data(),
      }));
      const filterHotel = data.filter((x) => x.uid === hotelId);
      console.log(filterHotel[0].coordinates[0], filterHotel[0].coordinates[1]);
      const distance = calculateDistance(
        coord[0],
        coord[1],
        filterHotel[0].coordinates[0],
        filterHotel[0].coordinates[1]
      );

      const isMatch = distance <= 50;
      console.log(isMatch, distance);
      dispatch(updateLocationMatch(isMatch));
      setMatch(isMatch);
    });
    return () => {
      unsubscribeHotel();
    };
  };

  return (
    <div>
      {/* <div>
        <p>
          Current Location: Latitude: {location[0]}, Longitude: {location[1]}
          <br />
          store Location: Latitude: {locationsData[0]}, Longitude:{" "}
          {locationsData[1]}
        </p>
        {match ? (
          <p>Current location matches a stored location!</p>
        ) : (
          <p>No match for the current location.</p>
        )}
      </div> */}
    </div>
  );
};

export default GeolocationComponent;
