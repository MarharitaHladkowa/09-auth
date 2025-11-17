import css from "./Header.module.css";
import Link from "next/link";
import { ALL_NOTES } from "@/lib/constants";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation" className={css.navigation}>
        <Link href="/">Home</Link>

        <Link href={`/notes/filter/${ALL_NOTES}`}>Notes</Link>
        <AuthNavigation />
      </nav>
    </header>
  );
};

export default Header;
