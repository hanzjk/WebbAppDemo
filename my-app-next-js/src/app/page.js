import styles from "./page.module.css";
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <h1>{process.env.API_URL}</h1>

      <Link href="/greetings">Greetings</Link>

      </div>
    </main>
  );
}
