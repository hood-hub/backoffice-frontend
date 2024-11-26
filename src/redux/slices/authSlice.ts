import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";

// Define the user interface
interface User {
  id: string;
  firstName: string; // Added firstName for better consistency
  lastName: string;
  email: string;
  [key: string]: any;
}

// Define the auth state
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Decode JWT to extract user details
const parseJwt = (token: string): User | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const userData = JSON.parse(jsonPayload);
    
    // Ensure it has at least firstName and other key details
    return {
      id: userData.id,
      firstName: userData.firstName || "",  // Handle missing firstName gracefully
      lastName: userData.lastName || "",
      email: userData.email,
      ...userData,  // Include other properties dynamically
    };
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

// Async thunk to check auth from localStorage
export const setAuthFromStorage = createAsyncThunk("auth/setAuthFromStorage", async () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    return { token, user: JSON.parse(user) };
  }
  return { token: null, user: null };
});

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { emailOrUsername: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/login", credentials);
      const token = response.data.data; // Ensure token is correctly fetched
      const user = parseJwt(token);

      if (!user) {
        throw new Error("Failed to parse user information from token.");
      }

      // Save token and user to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error: any) {
      console.error("Login error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed. Please try again."
      );
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set authentication manually (e.g., for testing or custom flows)
    setAuth(state, action: PayloadAction<{ token: string; user: User }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    // Logout and clear the state
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading auth state from localStorage
      .addCase(setAuthFromStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setAuthFromStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload.token;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(setAuthFromStorage.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = "Failed to load authentication from storage.";
      })

      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

// Export actions and reducer
export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
