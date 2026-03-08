// context/UsersContext.jsx
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// 1️⃣ Create context
const UsersContext = createContext(null);

// 2️⃣ Create hook for easy access
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

// 3️⃣ Create provider
export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: safely load users from localStorage or API
  useEffect(() => {
    try {
      const stored = localStorage.getItem("users");
      if (stored) {
        setUsers(JSON.parse(stored));
      } else {
        setUsers([]); // fallback
      }
    } catch (err) {
      console.error("Failed to load users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Optional: provide a function to add a user safely
  const addUser = (user) => {
    setUsers((prev) => {
      const updated = [...prev, user];
      try {
        localStorage.setItem("users", JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save users:", err);
      }
      return updated;
    });
  };

  // 4️⃣ Provide context value
  const value = { users, loading, addUser };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}
