"use client";
import css from "./EditProfilePage.module.css";
import { useState, useEffect } from "react";
import { updateMe, getMe } from "@/lib/clientApi";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? "");
    });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ userName, photoUrl: "" });
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <img
          src="avatar"
          alt="User Avatar"
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

          <p>Email:</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default EditProfile;
