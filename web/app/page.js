import styles from "./page.module.css";
import Link from "next/link";
// import LoadingComponent from "@/components/LoadingComponent";
// import Notification from "@/components/Notification";

export default function Home() {
  return (
    <main 
    // className={styles.main}
    >
     <Link href={"/login"}>Login</Link>
     <Link href={"/helpdesk"}>HD</Link>
     {/* <LoadingComponent /> */}
     {/* <Notification /> */}
    </main>
  );
}
