"use client";

import css from "./EditProfilePage.module.css";
import { useState, useEffect } from "react";

import { updateMe, getMe, checkSession } from "@/lib/api/clientApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/lib/store/authStore";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  // 1. Инициализация данных пользователя при загрузке
  useEffect(() => {
    if (user) {
      setUserName(user.username || "");
      return;
    }

    const fetchUser = async () => {
      try {
        await checkSession();
        const fetchedUser = await getMe();
        if (fetchedUser) {
          setUser(fetchedUser);
          setUserName(fetchedUser.username || "");
        }
      } catch {
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [clearIsAuthenticated, setUser, user]);

  // Обработчик изменения поля ввода
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updateMe({
        username: userName,
      });

      if (user) {
        // Обновляем локальное состояние zustand
        setUser({ ...user, username: userName });
      }

      router.push("/profile");
    } catch (error) {
      console.log(error);
      // Здесь может быть дополнительная логика для отображения ошибки пользователю
    }
  };

  // 3. Функция для отмены (вынесена на уровень компонента)
  const handleCancel = () => {
    router.push("/profile");
  };

  // 4. Корректная обработка состояния загрузки (если user еще не загружен)
  if (!user) return null;

  // 5. JSX (визуальная часть) возвращается из основной функции компонента
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
              onClick={handleCancel} // Используем вынесенную функцию
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
