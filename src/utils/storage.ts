export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profilePicture?: string; // Optional property
  isAdmin: boolean;
  isVerified: boolean;
  stringAddress?: string; // Optional string address
  geoAddress?: { // Optional geographic address
    type: string;
    coordinates: [number, number]; // Array with latitude and longitude
  };
}

/**
 * Decodes a JWT and parses its payload into a User object.
 * @param token - The JWT token to decode.
 * @returns Parsed User object.
 * @throws Error if the token is invalid.
 */
export const parseJwt = (token: string): User => {
  try {
    // Extract the payload part of the JWT (base64Url encoded)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    // Parse the JSON payload into a User object
    return JSON.parse(jsonPayload) as User;
  } catch {
    // Throw a new error if parsing fails
    throw new Error("Invalid token");
  }
};
