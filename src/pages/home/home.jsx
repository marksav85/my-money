// components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
// hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

// styles
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid], // query by user id
    ["createdAt", "desc"] // order by createdAt in descending order
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}{" "}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
