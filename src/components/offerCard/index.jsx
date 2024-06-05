import { collection, getDocs } from "firebase/firestore";
import { Howl } from "howler";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clickSound from "../../assets/effect/clickSound.mp3";
import trashSound from "../../assets/effect/trash.mp3";
import ribbonIcon from "../../assets/images/ribbon.png";
import { db } from "../../firebaseConfig";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
import NormalBtn from "../normalButton";
import "./styles.css";

export const OfferCard = ({ item, type = 1, index }) => {
  console.log(item, type, index)
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const isColumn = type === 1;

  const [foodItems, setFoodItems] = useState([]);

  const [addToCartBtnLabels, setAddToCartBtnLabels] = useState(
    Array(foodItems.length).fill("Add to Cart")
  );

  const [itemQuantities, setItemQuantities] = useState(
    Array(foodItems.length).fill(0)
  );

  const cartSound = new Howl({
    src: [clickSound],
    volume: 1,
  });
  const trash = new Howl({
    src: [trashSound],
    volume: 0.5,
  });

  const addToCart = (item, id) => {
    cartSound.play();
    dispatch(addCartItem({ item, quantity: 1 }));

    const newLabels = [...addToCartBtnLabels];
    newLabels[index] = "Plus";
    setAddToCartBtnLabels(newLabels);

    const newQuantities = [...itemQuantities];
    newQuantities[index]++;
    setItemQuantities(newQuantities);
  };

  const removeFromCart = (item, id) => {
    trash.play();

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
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchData();
  }, []);

  console.log(cart);
  return (
    <div>
      {Boolean(isColumn) ? (
        <div className="body">
          <div className="card-view">
            <div className="image-view">
              <img src={item.image} alt="img" className="card-image" />
              {item.type === "Combo" && (
                <img src={item.image1} alt="img" className="card-image1" />
              )}
            </div>
            <div className="ribbon-container">
              <p className="type">{item?.type}</p>
              <img src={ribbonIcon} alt="img" className="ribbon" />
            </div>
            <div className="view-details">
              <div className="name-view">
                <p className="name">{item?.name}</p>
              </div>
              <div className="btn-container">
                {itemQuantity(item) > 0 ? (
                  <div className="d-flex align-items-center justify-content-evenly w-100 animation-ease-in">
                    <NormalBtn
                      btnlabel={"-"}
                      className={"food-increase-btn-hz"}
                      onClick={() => removeFromCart(item, item.id)}
                    />
                    <span className="food-list-quantity mx-3">
                      {itemQuantity(item)}
                    </span>
                    <NormalBtn
                      btnlabel={"+"}
                      className={"food-increase-btn-hz"}
                      onClick={() => addToCart(item, item.id)}
                    />
                  </div>
                ) : (
                  <NormalBtn
                    btnlabel={"Add to cart"}
                    className={"food-list-btn"}
                    onClick={() => addToCart(item, item.id)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="body-hz">
          <div className="card-view-hz">
            <div className="image-view-hz">
              <img src={item.image} alt="img" className="card-image-hz" />
              {item.type === "Combo" && (
                <img src={item.image1} alt="img" className="card-image1-hz" />
              )}
            </div>

            <div className="ribbon-container-hz">
              <p className="type">{item?.type}</p>
              <img src={ribbonIcon} alt="img" className="ribbon-hz" />
            </div>
            <p className="name-hz">{item?.name}</p>
            {itemQuantity(item) > 0 ? (
              <div className="d-flex align-items-center justify-content-evenly w-100 animation-ease-in">
                <NormalBtn
                  btnlabel={"-"}
                  className={"food-increase-btn-hz"}
                  onClick={() => removeFromCart(item)}
                />
                <span className="food-list-quantity mx-3">
                  {itemQuantity(item)}
                </span>
                <NormalBtn
                  btnlabel={"+"}
                  className={"food-increase-btn-hz"}
                  onClick={() => addToCart(item)}
                />
              </div>
            ) : (
              <NormalBtn
                btnlabel={"Add to cart"}
                className={"food-list-btn-hz"}
                onClick={() => addToCart(item)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
// const [modalIsOpen, setModalIsOpen] = useState(false);
// const [selectedOffer, setSelectedOffer] = useState(null);

// const openModal = (offer) => {
//   setSelectedOffer(offer);
//   setModalIsOpen(true);
// };

// const closeModal = () => {
//   setModalIsOpen(false);
//   setSelectedOffer(null);
// };

{
  /* <Modal show={modalIsOpen} handleClose={() => setModalIsOpen(false)}>
        {selectedOffer && (
          <div className="modal-body">
            <h2 className="food-name">{selectedOffer.name}</h2>
            <p className="food-discount">Discount: {selectedOffer.discount}%</p>
            <p className="food-type">Type: {selectedOffer.type}</p>
            <div className="image-container">
              <img
                src={selectedOffer.image}
                alt={selectedOffer.name}
                className="food-image"
              />
              {selectedOffer.type === "Combo" && (
                <img
                  src={selectedOffer.image1}
                  alt={`${selectedOffer.name} combo`}
                  className="food-image1"
                />
              )}
            </div>

            <button onClick={closeModal}>Continue Order</button>
          </div>
        )}
      </Modal> */
}
