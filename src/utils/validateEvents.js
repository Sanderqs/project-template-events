export function validateEvent(eventData) {
  const errors = {};

  // TITLE
  if (!eventData.title?.trim()) {
    errors.title = "Title is required";
  }

  // DESCRIPTION
  if (!eventData.description?.trim()) {
    errors.description = "Description is required";
  }

  // IMAGE
  if (!eventData.image?.trim()) {
    errors.image = "Image URL is required";
  } else if (!isValidUrl(eventData.image)) {
    errors.image = "Image must be a valid URL";
  }

  // START TIME
  if (!eventData.startTime) {
    errors.startTime = "Start time is required";
  }

  // END TIME
  if (!eventData.endTime) {
    errors.endTime = "End time is required";
  }

  // TIME LOGIC CHECK
  if (eventData.startTime && eventData.endTime) {
    const start = new Date(eventData.startTime);
    const end = new Date(eventData.endTime);

    if (end <= start) {
      errors.endTime = "End time must be after start time";
    }
  }

  // CATEGORIES
  if (!eventData.categoryIds || eventData.categoryIds.length === 0) {
    errors.categoryIds = "At least one category is required";
  }

  return errors;
}

// Helper
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
