import React, { useEffect, useState } from "react";
import Navbar from "../../components/navBar";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
import foodData from "../../foodData.json";
import NormalBtn from "../../components/normalButton";
import { db } from "../../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

// const foodItems = [
//   {
//     name: "South Indian",
//     imgSrc:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC_quaq3okgk1XPVzQp7BfdDQnMsABMEugW9XJxYxWX_lvpAi5LOOKrZZAzI8KtcOokx4&usqp=CAU",
//   },
//   {
//     name: "Main Courses",
//     imgSrc:
//       "https://media.istockphoto.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=612x612&w=0&k=20&c=2cROUMurZUtuvqF-bp8lViZ0wDXBNkZBcIjQj2QQlec=",
//   },

//   {
//     name: "Drinks",
//     imgSrc:
//       "https://img.freepik.com/free-photo/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai_188544-12370.jpg",
//   },

//   {
//     name: "Desserts",
//     imgSrc:
//       "https://t3.ftcdn.net/jpg/01/76/33/14/360_F_176331484_nLHY9EoW0ETwPZaS9OBXPGbCJhT70GZe.jpg",
//   },
//   {
//     name: "Appetizers",
//     imgSrc:
//       "https://media.istockphoto.com/id/174987545/photo/canapes-for-party.jpg?s=612x612&w=0&k=20&c=RtZXWZtOVWK3J5xKERls-o74EWdAXLP3y7S0IChfqOg=",
//   },
//   {
//     name: "Side Dishes",
//     imgSrc:
//       "https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Homemade-Tater-Tot-Casserole.png",
//   },
//   {
//     name: "Salads",
//     imgSrc:
//       "https://images.immediate.co.uk/production/volatile/sites/30/2022/06/Epic-summer-salad-3aeb697.jpg",
//   },
//   {
//     name: "Soups",
//     imgSrc:
//       "https://www.allrecipes.com/thmb/p4F_knUDCrUNusNOTyjY_dCp8d4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/13338-quick-and-easy-vegetable-soup-DDMFS-4x3-402702f59e7a41519515cecccaba1b80.jpg",
//   },
//   {
//     name: "Beverages",
//     imgSrc:
//       "https://static.vecteezy.com/system/resources/thumbnails/026/500/574/small_2x/summer-refreshing-beverages-photo.jpg",
//   },
// ];

function Home() {
  // const handleSubmit = async (e) => {
  //   try {
  //     const promises = foodItems.map((item) =>
  //       addDoc(collection(db, "categories"), item)
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
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

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

  const addToCart = (item, index) => {
    dispatch(addCartItem({ item, quantity: 1 }));

    const newLabels = [...addToCartBtnLabels];
    newLabels[index] = "Plus";
    setAddToCartBtnLabels(newLabels);

    const newQuantities = [...itemQuantities];
    newQuantities[index]++;
    setItemQuantities(newQuantities);
  };

  const removeFromCart = (item, index) => {
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
    </div>
  );
}

export default Home;
