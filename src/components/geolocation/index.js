// src/GeolocationComponent.js
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { updateLocationMatch } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";

const GeolocationComponent = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState([]);
  const [locationsData, setLocationdata] = useState([]);

  const [match, setMatch] = useState(false);
  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      console.log(arr1[i].toFixed(0), arr2[i].toFixed(0));
      if (arr1[i].toFixed(0) === arr2[i].toFixed(0)) {
      } else {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(lat, lon);
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

    const distance = R * c; // Distance in meters
    return distance;
  };

  const fetchLocations = async (coord) => {
    try {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const locationsData = querySnapshot.docs.map(
        (doc) => doc.data().coordinates
      );
      const distance = calculateDistance(
        coord[0],
        coord[1],
        locationsData[0][0],
        locationsData[0][1]
      );
      const isMatch = distance <= 50;
      // const isMatch = arraysAreEqual(coord, locationsData[0]);
      setLocationdata(locationsData[0]);
      dispatch(updateLocationMatch(isMatch));
      setMatch(isMatch);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default GeolocationComponent;
