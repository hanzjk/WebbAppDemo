import Greetings from "@/pages/greetings";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href="/greetings">Greetings</Link>
      </div>
    </main>
  );
}
