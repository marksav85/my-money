// components
import TransactionForm from "./TransactionForm";
// hooks
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <div className={styles.content}>Transaction List</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
