import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const checkDocumentExistence = async (code) => {
  try {
    const appointmentRef = doc(db, "Appointments", code);
    const appointmentSnap = await getDoc(appointmentRef);
    return appointmentSnap.exists();
  } catch (error) {
    console.error("Error checking document existence:", error);
    return false;
  }
};

const getAppointmentDoc = async (code) => {
  try {
    const appointmentRef = doc(db, "Appointments", code);
    const appointmentSnap = await getDoc(appointmentRef);
    return appointmentSnap;
  } catch (error) {
    console.error("Error checking document existence:", error);
    return false;
  }
};

const addDocument = async (collectionName, newDocument) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), newDocument);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const addAppointment = async (documentId, AppointmentData) => {
  try {
    const docRef = doc(db, "Appointments", documentId);
    await setDoc(docRef, AppointmentData);
    console.log("Document written with custom ID: ", documentId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Read (get all documents)
const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

const updateDocument = async (collectionName, docId, updatedData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    console.log("Document updated with ID: ", docRef.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log("Document deleted with ID: ", docId);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export {
  addDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  checkDocumentExistence,
  addAppointment,
  getAppointmentDoc,
};
