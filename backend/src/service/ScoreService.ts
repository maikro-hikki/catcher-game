//example implementation of validation methods for future development

// checks if username only has letters and numbers, is 4-20 characters long, and
// not null or empty or blank
function usernameValidation(username: string): string {
  if (username === null || username === "") {
    return "Username cannot be empty";
  }

  const pattern = /^[a-zA-Z0-9]+$/;
  const isMatch = pattern.test(username);

  if (!isMatch) {
    return "Invalid username";
  }

  if (username.length < 4 || username.length > 20) {
    return "Username must be 4-20 characters long";
  }

  return "Valid";
}

//score has to be an integer and fall within the integer bounds
function scoreValidation(score: string): string {
  try {
    const scoreToInt = parseInt(score);
    return "Valid";
  } catch (error) {
    return "Invalid score";
  }
}
