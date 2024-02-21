import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const useCollections = (collectionData) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // collection ref
    let ref = collection(projectFirestore, collectionData);

    const unsubscribe = ref.onSnapshot(
      (snap) => {
        let results = [];
        snap.docs.forEach((doc) => {
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
  }, [collection]);

  return { documents, error };
};
