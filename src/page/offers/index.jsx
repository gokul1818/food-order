import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navBar/index";
import { OfferCard } from "../../components/offerCard";
import { db } from "../../firebaseConfig";
import "./style.css";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useSelector } from "react-redux";
import Loader from "../../components/loader";
function Offers() {
  const filterData = ["All", "Special", "Combo"];
  const [foodItems, setFoodItems] = useState([]);
  const [topRecArr, setTopRecArr] = useState([]);
  const [loader, setLoader] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const hotelId = useSelector((state) => state.auth.hotelId);

  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filter);
    }
  };

  useEffect(() => {
    setLoader(true);
    const unsubscribe = onSnapshot(
      collection(db, "offers"),
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const hotelOffers = items.filter((data) => data?.hotelId === hotelId);
        setFoodItems(hotelOffers);
        // Filter top recommended items
        const topRecItems = hotelOffers.filter(
          (offer) => offer.topRec === true
        );
        setTopRecArr(topRecItems);
      }
    );
    setTimeout(() => {
      setLoader(false);
    }, 250);

    return () => unsubscribe();
  }, []);

  const filteredOffers =
    selectedFilter === "All"
      ? foodItems
      : foodItems.filter(
          (offer) => offer.type.toLowerCase() === selectedFilter.toLowerCase()
        );

  return (
    <div className="bg-color">
      <Navbar />
      {!loader ? (
        <div className="ease-in w-100 pb-5 mb-3">
          {topRecArr.length ? (
            <>
              <h5 className="d-flex mt-5 ms-3  glow-text" style={{}}>
                New offers <NewReleasesIcon sx={{ mx: 2, color: "#facd00" }} />
              </h5>

              <div className="horizontal-view">
                {topRecArr.map((offer, index) => (
                  <OfferCard
                    key={offer.id}
                    item={offer}
                    index={index}
                    type={2}
                  />
                ))}
              </div>
            </>
          ) : (
            <div> {""}</div>
          )}
          <div
            className={`horizontal-filter ${
              topRecArr.length == 0 ? " mt-5 pt-4" : ""
            } `}
          >
            {filterData.map((filter, index) => (
              <div
                key={index}
                className={`filter-view ${
                  selectedFilter === filter ? "selected" : ""
                }`}
                onClick={() => handleFilterClick(filter)}
              >
                <div className="filter-box">
                  <p
                    className={`filter-style ${
                      selectedFilter === filter ? "selected" : ""
                    }`}
                  >
                    {filter}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredOffers.map((offer, index) => (
            <OfferCard key={offer.id} item={offer} index={index} type={1} />
          ))}
        </div>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ height: "100vh" }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Offers;
