import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (collectionData) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // collection ref
    let ref = collection(projectFirestore, collectionData);

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
  }, [collectionData]);

  return { documents, error };
};
