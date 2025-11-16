"use client";

import css from "./EditProfilePage.module.css";
import { useState, useEffect } from "react";

import { updateMe, getMe } from "@/lib/api/clientApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/authStore";

const EditProfile = () => {
  const [userName, setUserName] = useState("");

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const router = useRouter();

  // Загружаем текущие данные пользователя
  useEffect(() => {
    getMe().then((data) => {
      setUserName(data.username ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // Сохранение имени пользователя
  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Обновляем на бэкенде
    const updatedUser = await updateMe({
      username: userName,
      photoUrl: user?.avatar ?? "", // НЕ стираем фото
    });

    // Обновляем глобальный стор
    setUser(updatedUser);

    // Редирект обратно на профиль
    router.push("/profile");
  };

  // Возврат на профиль (Cancel)
  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar}
          alt="User avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              value={userName}
              type="text"
              className={css.input}
              onChange={handleChange}
            />
          </div>

          {/* Email только текстом */}
          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
