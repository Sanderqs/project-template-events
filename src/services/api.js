export const BASE_URL = "http//:localhost:3001";

export async function fetchAllData() {
  try {
    const [usersRes, eventsRes, categoriesRes] = await Promise.all([
      fetch("http://localhost:3001/users"),
      fetch("http://localhost:3001/events"),
      fetch("http://localhost:3001/categories"),
    ]);

    const [users, events, categories] = await Promise.all([
      usersRes.json(),
      eventsRes.json(),
      categoriesRes.json(),
    ]);

    console.log(users, events, categories);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

fetchAllData();
