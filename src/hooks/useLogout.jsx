import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const handleLogout = async () => {
    try {
      setIsPending(true);
      setError(null);
      // sign user out
      await projectAuth.signOut();
      // dispatch logout action
      dispatch({ type: "LOGOUT" });
      setIsPending(false);
      setError(null);
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };

  return { handleLogout, error, isPending };
};
