import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const handleSignup = async (name, email, password) => {
    setIsPending(true);
    setError(null);

    try {
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      // if error
      if (!res) {
        throw new Error("Could not complete the signup");
      }
      // update user display name
      await updateProfile(res.user, { displayName: name });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };

  return {
    error,
    isPending,
    handleSignup,
  };
};
