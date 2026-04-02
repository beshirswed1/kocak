import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import type { OrderItem } from "@/types";

/**
 * Submit a new order to Firestore
 */
export async function submitOrder(data: {
  items: OrderItem[];
  tableNumber: string;
  note: string;
  totalPrice: number;
}) {
  const orderRef = await addDoc(collection(db, "orders"), {
    items: data.items,
    tableNumber: data.tableNumber,
    note: data.note,
    totalPrice: data.totalPrice,
    status: "pending",
    createdAt: Date.now(),
  });
  return orderRef.id;
}

/**
 * Update order status (pending → completed / cancelled)
 */
export async function updateOrderStatusInDb(
  orderId: string,
  status: "pending" | "completed" | "cancelled"
) {
  const orderDoc = doc(db, "orders", orderId);
  await updateDoc(orderDoc, { status });
}

/**
 * Delete an order from Firestore
 */
export async function deleteOrderFromDb(orderId: string) {
  const orderDoc = doc(db, "orders", orderId);
  await deleteDoc(orderDoc);
}
