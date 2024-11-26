
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";

interface Post {
  _id: string;
  text: string;
  media: string[];
  noOfLikes: number;
  noOfComments: number;
  stringAddress: string;
  isFlagged: boolean;
  isFlaggedResolved: boolean;
  flagReason: string;
  flaggedAt: string;
}

interface FlaggedPostsState {
  posts: Post[];
  pendingCount: number;
  resolvedCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: FlaggedPostsState = {
  posts: [],
  pendingCount: 0,
  resolvedCount: 0,
  loading: false,
  error: null,
};

export const fetchFlaggedPosts = createAsyncThunk(
  "flaggedPosts/fetchFlaggedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/flagged-posts"); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch posts");
    }
  }
);

const flaggedPostsSlice = createSlice({
  name: "flaggedPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlaggedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlaggedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data.posts;
        state.pendingCount = action.payload.data.pendingCount;
        state.resolvedCount = action.payload.data.resolvedCount;
      })
      .addCase(fetchFlaggedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default flaggedPostsSlice.reducer;
