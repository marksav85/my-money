import { useState } from "react";
import { projectAuth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSignup = async (name, email, password) => {
    setIsPending(true);
    setError(null);

    try {
      // create user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);
      // if error
      if (!res) {
        throw new Error("Could not complete the signup");
      }
      // update user display name
      await res.user.updateProfile({ displayName: name });
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
