// src/generateOrderId.js
import { doc, getDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const generateOrderId = async () => {
  const counterDocRef = doc(db, "counters", "orderCounter");

  // Initialize counter if it doesn't exist
  const counterDoc = await getDoc(counterDocRef);
  if (!counterDoc.exists()) {
    await setDoc(counterDocRef, { count: 0 });
  }

  // Increment the counter
  await setDoc(counterDocRef, { count: increment(1) }, { merge: true });

  // Get the updated counter value
  const updatedCounterDoc = await getDoc(counterDocRef);
  const count = updatedCounterDoc.data().count;

  // Format the order ID
  const orderId = `ORD${count.toString().padStart(5, "0")}`;
  return orderId;
};

export default generateOrderId;
