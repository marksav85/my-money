import { useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        ...state,
        isPending: true,
        document: null,
        success: null,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const collectionRef = collection(projectFirestore, collectionName);

  // only dispatches the response if the component is still mounted
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "PENDING" });

    try {
      const createdAt = serverTimestamp();
      const addedDocument = await addDoc(collectionRef, { ...doc, createdAt });

      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
      console.error("Error adding document: ", error);
    }
  };

  // delete a document
  const deleteDocument = () => {};

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};
