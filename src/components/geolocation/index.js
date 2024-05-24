// src/GeolocationComponent.js
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { updateLocationMatch } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";

const GeolocationComponent = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState([]);
  const [match, setMatch] = useState(false);

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      console.log(arr1[i].toFixed(0), arr2[i].toFixed(0));
      if (arr1[i] !== arr2[i]) {
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

  const fetchLocations = async (coord) => {
    try {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const locationsData = querySnapshot.docs.map(
        (doc) => doc.data().coordinates
      );
      console.log(coord, locationsData[0]);
      const isMatch = arraysAreEqual(coord, locationsData[0]);
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
