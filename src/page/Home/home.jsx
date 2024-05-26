import React, { useEffect, useState } from "react";
import Navbar from "../../components/navBar";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
import foodData from "../../foodData.json";
import NormalBtn from "../../components/normalButton";
import { db } from "../../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Modal from "../../components/modal/modal";
import GeolocationComponent from "../../components/geolocation";
import { Howl } from "howler";
import clickSound from "../../assets/effect/clickSound.mp3";
import trashSound from "../../assets/effect/trash.mp3";
import popSound from "../../assets/effect/sweep.mp3";

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
  const cart = useSelector((state) => state.cart.cart);
  const locationMatch = useSelector((state) => state.auth.locationMatch);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedList, setSelectedList] = useState();
  const [selectedFoodList, setSelectedFoodList] = useState(null);
  const [addToCartBtnLabels, setAddToCartBtnLabels] = useState(
    Array(foodItems.length).fill("Add to Cart")
  );

  const [itemQuantities, setItemQuantities] = useState(
    Array(foodItems.length).fill(0)
  );

  const handleFoodItemClick = (index) => {
    setSelectedList(index);
  };

  const cartSound = new Howl({
    src: [clickSound],
    volume: 1,
  });
  const trshSound = new Howl({
    src: [trashSound],
    volume: 1,
  });
  const SelectSound = new Howl({
    src: [popSound],
    volume: 1,
  });
  const addToCart = (item, index) => {
    cartSound.play();
    dispatch(addCartItem({ item, quantity: 1 }));

    const newLabels = [...addToCartBtnLabels];
    newLabels[index] = "Plus";
    setAddToCartBtnLabels(newLabels);

    const newQuantities = [...itemQuantities];
    newQuantities[index]++;
    setItemQuantities(newQuantities);
  };

  const removeFromCart = (item, index) => {
    trshSound.play();

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
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodItems(items);
        setSelectedList(items[0]?.name);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userPhoneNumber") == null) {
      setShowModal(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="ease-in">
        <div className="mt-5 pt-3">
          <p className="nav-label mb-0">Delicious food for you </p>
        </div>
        <div className="sticky-top pt-2">
          <div className=" d-flex justify-content-center align-items-center mt-3 ">
            <div className="search-container">
              <i className="search-icon fas fa-search"></i>
              <input
                type="text"
                placeholder="Search for delicious food..."
                className="search-input"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
        </div>
        {search.length == 0 ? (
          <>
            <p className="category-label mt-4"> Top categories </p>
            <div className="horizontal-scroll ">
              <div className="food-list">
                {foodItems.map((item, index) => (
                  <div
                    key={index}
                    className={
                      selectedList !== item.name
                        ? "food-item-selected"
                        : "food-item"
                    }
                    onClick={() => handleFoodItemClick(item.name)}
                  >
                    <img className="food-item-img " src={item.imgSrc} />
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
            <div className="horizontal-scroll">
              <div className="food-Data-list  mb-5">
                {foodData
                  .filter((item) => item?.category === selectedList)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="food-data-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        SelectSound.play();
                        setSelectedFoodList(index);
                      }}
                    >
                      <div className="position-relative">
                        <img
                          className={
                            selectedFoodList === index
                              ? "selected-food-list-img"
                              : "food-list-img"
                          }
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
                          <p className="food-list-dish-price">{item?.price}</p>
                          {selectedFoodList == index && (
                            <div className="d-flex justify-content-evenly my-3 w-100 ">
                              {itemQuantity(item) === undefined ? (
                                <NormalBtn
                                  btnlabel={"Add To Cart "}
                                  className={"food-list-cart-btn"}
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    setTimeout(() => {
                                      addToCart(item, index);
                                    }, 500);
                                  }}
                                />
                              ) : (
                                <div className="d-flex align-items-center justify-content-evenly w-100 animation-ease-in">
                                  <NormalBtn
                                    btnlabel={"-"}
                                    className={"food-list-cart-btn"}
                                    onClick={(e) => {
                                      e.stopPropagation();
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
                                    onClick={(e) => {
                                      e.stopPropagation();
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
          </>
        ) : (
          <div className="horizontal-scroll">
            <div className="food-Data-list  mb-5">
              {foodData
                .filter((item) =>
                  item?.dishName?.toLowerCase().includes(search?.toLowerCase())
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="food-data-item"
                    onClick={() => setSelectedFoodList(index)}
                  >
                    <div className="position-relative">
                      <img
                        className={
                          selectedFoodList === index
                            ? "selected-food-list-img"
                            : "food-list-img"
                        }
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
                        <p className="food-list-dish-price">{item?.price}</p>
                        {selectedFoodList == index && (
                          <div className="d-flex justify-content-evenly my-3 w-100 ">
                            {itemQuantity(item) === undefined ? (
                              <NormalBtn
                                btnlabel={"Add To Cart "}
                                className={"food-list-cart-btn"}
                                onClick={() => {
                                  setTimeout(() => {
                                    addToCart(item, index);
                                  }, 500);
                                }}
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
      </div>
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
