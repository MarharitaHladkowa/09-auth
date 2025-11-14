import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import { getServerMe } from "@/lib/serverApi";
import Link from "next/dist/client/link";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "Manage your profile information and settings.",
};
export default async function ProfilePage() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div>
          <h1>My Profile</h1>
          <Link href="/profile/edit">Edit profile</Link>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
