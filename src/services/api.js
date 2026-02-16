export const BASE_URL = "http://localhost:3000";

// export async function fetchAllData() {
//   try {
//     const [usersRes, eventsRes, categoriesRes] = await Promise.all([
//       fetch(`${BASE_URL}/users`),
//       fetch(`${BASE_URL}/events`),
//       fetch(`${BASE_URL}/categories`),
//     ]);

//     const [users, events, categories] = await Promise.all([
//       usersRes.json(),
//       eventsRes.json(),
//       categoriesRes.json(),
//     ]);

//     console.log(users, events, categories);
//   } catch (err) {
//     console.error("Error fetching data:", err);
//   }
// }

// fetchAllData();
export async function getEvents() {
  try {
    const response = await fetch(`${BASE_URL}/events`);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }

    const data = await response.json(); // parse JSON once
    console.log("Fetched events from API:", data); // ✅ logs actual events

    return data; // return parsed JSON for context or components
  } catch (err) {
    console.error("Error in getEvents:", err);
    throw err; // re-throw so context can handle it
  }
}
export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched categories from API:", data);

    return data;
  } catch (err) {
    console.error("Error in getCategories:", err);
    throw err;
  }
}

export async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched users from API:", data);

    return data;
  } catch (err) {
    console.error("Error in getUsers:", err);
    throw err;
  }
}
