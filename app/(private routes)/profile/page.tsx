import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import { getServerMe } from "@/lib/api/serverApi";
import Link from "next/link";
import Image from "next/image"; // Добавлен импорт Image

export const metadata: Metadata = {
  title: "Profile Page",
  description: "Manage your profile information and settings.",
};
export default async function ProfilePage() {
  const user = await getServerMe();
  const avatarSrc = user.avatar;
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div>
          <h1>My Profile</h1>
          <Link href="/profile/edit">Edit profile</Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatarSrc}
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
