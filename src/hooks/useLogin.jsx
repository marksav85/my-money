import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const handleLogin = async (email, password) => {
    setIsPending(true);
    setError(null);

    // sign user out
    try {
      const res = await signInWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      // dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user });

      // update state if not cancelled
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  // cleanup function
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { handleLogin, error, isPending };
};
