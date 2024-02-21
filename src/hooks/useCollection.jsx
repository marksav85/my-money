import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (collectionData, collectionQuery) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // use useRef to store the query to avoid re-rendering loop in useEffect dependency array
  const q = useRef(collectionQuery).current;

  useEffect(() => {
    // Update the ref when collectionQuery changes
    q.current = collectionQuery;
  }, [collectionQuery, q]);

  useEffect(() => {
    // collection ref
    let ref = collection(projectFirestore, collectionData);

    // queries user id before retrieving collection data
    if (q.current) {
      ref = query(ref, where(...q.current));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        let results = [];
        snap.forEach((doc) => {
          // must wait for the server to create a timestamp & send it back
          results.push({ ...doc.data(), id: doc.id });
        });
        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error.message);
        setDocuments(null);
        setError("could not fetch the data");
      }
    );

    // unsubscribe from snapshot when no longer in use
    return () => unsubscribe();
  }, [collectionData, q]);

  return { documents, error };
};
