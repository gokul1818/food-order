import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Howl } from "howler";
import Lottie from "react-lottie";
import Carousel from "react-material-ui-carousel";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clickSound from "../../assets/effect/clickSound.mp3";
import shineSound from "../../assets/effect/shine.mp3";
import popSound from "../../assets/effect/sweep.mp3";
import trashSound from "../../assets/effect/trash.mp3";
import tractIcon from "../../assets/images/track-icon.png";
import Modal from "../../components/modal/modal";
import Navbar from "../../components/navBar";
import NormalBtn from "../../components/normalButton";
import { db } from "../../firebaseConfig";
import {
  addCartItem,
  removeCartItem,
  selectedCategory,
} from "../../redux/reducers/cartSlice";
import "./style.css";
import { styled } from "@mui/system";
import { Badge, useScrollTrigger } from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { useLocation, useNavigate } from "react-router-dom";
import { OfferCard } from "../../components/offerCard";
import { TopCard } from "../../components/topCard";
import timer from "../../assets/orderTime.json";
import Loader from "../../components/loader";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRating from "../../components/starRating";
const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#fff",
    color: "#000", // Set your custom background color here
  },
}));

function Home() {
  // const handleSubmit = async (e) => {
  //   try {
  //     const promises = foodItems.map((item) =>
  //       addDoc(collection(db, "geoLocation"), item)
  //     );
  //     const docRefs = await Promise.all(promises);
  //     docRefs.forEach((docRef) =>
  //       console.log("Document written with ID: ", docRef.id)
  //     );
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // useEffect(() => {
  //   handleSubmit();
  // });

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const hotelId = useSelector((state) => state.auth.hotelId);

  const locationMatch = useSelector((state) => state.auth.locationMatch);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderedFood, setOrderedFood] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [combo, setCombo] = useState([]);
  const [special, setSpecial] = useState([]);
  const [selectedList, setSelectedList] = useState();
  const [selectedFoodList, setSelectedFoodList] = useState(null);
  const [foodList, setFoodList] = useState([]);
  const [offers, setOffers] = useState([]);
  const [addToCartBtnLabels, setAddToCartBtnLabels] = useState(
    Array(foodItems.length).fill("Add to Cart")
  );

  const [itemQuantities, setItemQuantities] = useState(
    Array(foodItems.length).fill(0)
  );

  const handleFoodItemClick = (index) => {
    dispatch(selectedCategory(index));
    navigate("/categories");
    // ShineSound.play();
  };

  // const cartSound = new Howl({
  //     src: [clickSound],
  //     volume: 1,
  //   });
  //   const trshSound = new Howl({
  //     src: [trashSound],
  //     volume: 0.5,
  //   });
  //   const SelectSound = new Howl({
  //     src: [popSound],
  //     volume: 0.5,
  //   });
  //   const ShineSound = new Howl({
  //     src: [shineSound],
  //     volume: 2,
  //   });
  const addToCart = (item, index) => {
    // cartSound.play();
    dispatch(addCartItem({ item, quantity: 1 }));

    const newLabels = [...addToCartBtnLabels];
    newLabels[index] = "Plus";
    setAddToCartBtnLabels(newLabels);

    const newQuantities = [...itemQuantities];
    newQuantities[index]++;
    setItemQuantities(newQuantities);
  };

  const removeFromCart = (item, index) => {
    // trshSound.play();

    dispatch(removeCartItem({ item, quantity: 1 }));
    const newQuantities = [...itemQuantities];
    newQuantities[index]--;
    setItemQuantities(newQuantities);

    if (newQuantities[index] === 0) {
      const newLabels = [...addToCartBtnLabels];
      newLabels[index] = "Add to Cart";
      setAddToCartBtnLabels(newLabels);
    }
  };

  const itemQuantity = (item) => {
    const quantity = cart.filter((x) => x?.dishName == item?.dishName);
    return quantity[0]?.quantity;
  };

  useEffect(() => {
    setLoader(true);
    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const hotelCategories = items.filter(
          (data) => data?.hotelId === hotelId
        );
        setFoodItems(hotelCategories);
        if (items.length > 0) {
          setSelectedList(items[0].name);
        }
      }
    );

    setLoader(true);
    const unsubscribeOffers = onSnapshot(
      collection(db, "offers"),
      (querySnapshot) => {
        const offersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const hotelOffers = offersData.filter(
          (data) => data?.hotelId === hotelId
        );
        const topRecItems = hotelOffers.filter(
          (offer) => offer.topRec === true
        );
        console.log(topRecItems);
        setOffers(topRecItems);

        // Filter special offers
        const specialOffers = topRecItems.filter(
          (offer) => offer.type === "special"
        );
        // Filter combo offers
        const comboOffers = topRecItems.filter(
          (offer) => offer.type === "combo"
        );

        setSpecial(specialOffers);
        setCombo(comboOffers);
      }
    );
    setTimeout(() => {
      setLoader(false);
    }, 1000);

    return () => {
      unsubscribe();
      unsubscribeOffers();
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userPhoneNumber") == null) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    setLoader(true);

    const unsubscribe = onSnapshot(
      collection(db, "foodList"),
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const hotelFodds = items.filter((data) => data?.hotelId === hotelId);
        setFoodList(hotelFodds);
      }
    );

    setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => {
      unsubscribe();
    };
  }, []);

  const userPhoneNumber = localStorage.getItem("userPhoneNumber");

  useEffect(() => {
    if (!userPhoneNumber) {
      console.error("No user phone number found in local storage.");
      return;
    }

    const ordersCollection = collection(db, `orders-${hotelId}`);
    const q = query(
      ordersCollection,
      where("phoneNumber", "==", userPhoneNumber)
    );

    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      q,
      (ordersSnapshot) => {
        const ordersList = ordersSnapshot.docs
          .sort(
            (a, b) => b.data().orderTime.seconds - a.data().orderTime.seconds
          ) // Ensure correct property access
          .map((doc) => doc.data());
        const hotelOrdersList = ordersList.filter(
          (data) => data?.hotelId === hotelId
        );

        setOrderedFood(hotelOrdersList);
      },
      (error) => {
        console.error("Error fetching orders:", error);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, [userPhoneNumber]);

  const filteredFoodList = foodList.filter(
    (food) => food.category === selectedFoodList?.name
  );

  return (
    <div className="home-container">
      <Navbar />
      {!loader ? (
        <div className="ease-in position-relative">
          <div className="head mt-3">
            <p className="nav-label mb-0">Delicious food for you </p>
            {/* <div className="cart-logo-container">
              <button
                onClick={() => {
                  setTimeout(() => {
                    navigate("/cart");
                  }, 100);
                }}
                style={{
                  background: "transparent",
                  borderColor: "transparent",
                  marginTop: "10px",
                }}
              >
                <CustomBadge  badgeContent={cart?.length}>
                  <ShoppingCartSharpIcon
                    sx={{
                      color: "#fff",
                      padding: 1,
                      fontSize: 40,
                    }}
                  />
                </CustomBadge>
              </button>
            </div> */}
          </div>
          <div className=" pt-2">
            <div className=" d-flex justify-content-center align-items-center mt-3 ">
              <div className="search-container">
                <i className="search-icon fas fa-search"></i>
                <input
                  type="text"
                  placeholder="What did you eat today ?"
                  className="search-input"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
            </div>
          </div>
          {search.length == 0 ? (
            <>
          
              <div className="horizontal-scroll ">
                <div className="food-list">
                  {foodItems.map((item, index) => (
                    <div
                      key={index}
                      className={
                        selectedList === item.name
                          ? "food-item-selected"
                          : "food-item"
                      }
                      onClick={() => handleFoodItemClick(item.name)}
                    >
                      <img className="food-item-img" src={item.imgSrc} />
                      <p
                        className={
                          selectedList !== item.name ? "selected" : "unselected"
                        }
                      >
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="horizontal-scroll">
              <div className="food-Data-list  mb-5">
                {foodList
                  .filter((item) =>
                    item?.dishName
                      ?.toLowerCase()
                      .includes(search?.toLowerCase())
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="food-data-item"
                      onClick={() => setSelectedFoodList(index)}
                    >
                      <div className="position-relative">
                        <img
                          className={`${
                            selectedFoodList === index
                              ? "selected-food-list-img"
                              : "food-list-img"
                          }  
                          ${item.isSoldOut ? "soldOut" : ""}
                          `}
                          src={item?.img}
                          alt="img"
                        />
                        <div
                          className={
                            selectedFoodList === index
                              ? "selected-food-data-item-container"
                              : "food-data-item-container"
                          }
                        >
                          <p
                            className={
                              selectedFoodList === index
                                ? "selected-food-list-dish-name"
                                : "food-list-dish-name"
                            }
                          >
                            {item?.dishName.length > 20 &&
                            selectedFoodList !== index
                              ? item?.dishName.slice(0, 20) + "..."
                              : item?.dishName}
                          </p>
                          {<StarRating rating={3}/>}

                          <p className="food-list-dish-price">{item?.price}</p>
                          {selectedFoodList === index && (
                            <div className="d-flex justify-content-evenly my-3 w-100 ">
                              {itemQuantity(item) === undefined ? (
                                <NormalBtn
                                  btnlabel={
                                    item.isSoldOut ? "soldOut" : "Add To Cart "
                                  }
                                  className={"food-list-cart-btn"}
                                  onClick={() => {
                                    setTimeout(() => {
                                      addToCart(item, index);
                                    }, 500);
                                  }}
                                  disabled={item.isSoldOut}
                                />
                              ) : (
                                <div className="d-flex align-items-center justify-content-evenly w-100 animation-ease-in">
                                  <NormalBtn
                                    btnlabel={"-"}
                                    className={"food-list-cart-btn"}
                                    onClick={() => {
                                      setTimeout(() => {
                                        removeFromCart(item, index);
                                      }, 500);
                                    }}
                                  />
                                  <span className="food-list-quantity mx-3">
                                    {/* {cart[index].quantity} */}
                                    {itemQuantity(item)}
                                  </span>
                                  <NormalBtn
                                    btnlabel={"+"}
                                    className={"food-list-cart-btn"}
                                    onClick={() => {
                                      setTimeout(() => {
                                        addToCart(item, index);
                                      }, 500);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* <Carousel
            autoPlay={true}
            interval={2000}
            animation="slide"
            indicators={false}
            navButtonsAlwaysInvisible={true}
          >
          </Carousel> */}
          {/* ----------------- TOP OFFERS ----------------- */}
          {special.length ? (
            <h5
              className="d-flex mt-3   glow-text"
              style={{ marginLeft: "7%" }}
            >
              special offers{" "}
              <NewReleasesIcon sx={{ mx: 2, color: "#facd00" }} />
            </h5>
          ) : null}
          <div className="horizontal-scroll ">
            <div className="food-list">
              {special.map((offer) => (
                <TopCard key={offer.id} item={offer} />
              ))}
            </div>
          </div>
          {combo.length ? (
            <h5
              className="d-flex mt-3   glow-text"
              style={{ marginLeft: "7%" }}
            >
              combo offers <NewReleasesIcon sx={{ mx: 2, color: "#facd00" }} />
            </h5>
          ) : null}
          <div className="horizontal-scroll ">
            <div className="food-list">
              {combo.map((offer) => (
                <TopCard key={offer.id} item={offer} />
              ))}
            </div>
          </div>
          {orderedFood?.length > 0 && (
            <div
              className="track-card"
              onClick={() => navigate("/order-status")}
            >
              <div className="d-flex flex-column w-75 ">
                <h6 className="tract-text">Track Your Order</h6>
                <p className="m-0 ">Click here to see the full details,</p>
              </div>

              <Lottie
                options={{
                  animationData: timer,
                  loop: true,
                  autoplay: true,
                }}
                height={100}
                width={100}
              />
            </div>
          )}
          <div className="mt-5">

          </div>
        </div>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ height: "100vh" }}
        >
          <Loader />
        </div>
      )}

      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <h2 className="modal-label">Login</h2>
        <input
          type="number"
          placeholder="Enter PhoneNumber"
          className="phoneNumber-input mb-4 px-2 mt-3"
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 10) {
              setPhoneNumber(value);
            }
          }}
          value={phoneNumber}
          max={10}
          maxLength={10}
        />
        <NormalBtn
          btnlabel={"login"}
          className={"login-btn "}
          onClick={() => {
            setShowModal(false);
            localStorage.setItem("userPhoneNumber", phoneNumber);
          }}
          disabled={phoneNumber.length !== 10 ? true : false}
        />
      </Modal>
    </div>
  );
}

export default Home;
