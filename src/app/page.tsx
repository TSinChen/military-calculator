import Link from "next/link";
import Form from "./_form/form";
import styles from "./page.module.scss";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.card__title}>兵役計算機</h1>
        <Form />
      </div>
      <Link
        className={styles.github}
        href="https://github.com/TSinChen/military-calculator"
        target="_blank"
      >
        <Image src="/github.png" alt="" width={45} height={45} />
      </Link>
    </main>
  );
}
