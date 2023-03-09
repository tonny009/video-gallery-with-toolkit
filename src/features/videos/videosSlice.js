import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVideos } from "./videosApi";

const initialState = {
  videos: [],
  isLoading: false,
  isError: false,
  error: "",
};

//async thunk function for getting videos from db ----
export const fetchVideosAsync = createAsyncThunk(
  "videos/fetchVideos",
  async () => {
    const videos = await getVideos();
    return videos;
  }
);

const videoSlice = createSlice({
  name: "Videos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchVideosAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideosAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.videos = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

// Exportation ------------

export default videoSlice.reducer;
