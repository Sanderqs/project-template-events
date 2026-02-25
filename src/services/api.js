export const BASE_URL = "http://localhost:3000";

/**
 * Fetch all events
 */
export async function getEvents() {
  try {
    const response = await fetch(`${BASE_URL}/events`);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched events from API:", data);

    return data;
  } catch (err) {
    console.error("Error in getEvents:", err);
    throw err;
  }
}

/**
 * Fetch all categories
 */
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

/**
 * Fetch all users
 */
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

/**
 * Create a new event
 * @param {object} event - Event object to create
 */
export async function createEvent(eventData) {
  try {
    const response = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.status}`);
    }

    const newEvent = await response.json();
    console.log("Created new event:", newEvent);
    return newEvent;
  } catch (err) {
    console.error("Error in createEvent:", err);
    throw err;
  }
}
