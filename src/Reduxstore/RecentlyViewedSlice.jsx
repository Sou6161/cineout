import { createSlice } from "@reduxjs/toolkit";

export const RecentlyViewedSlice = createSlice({
  name: "recentlyvieweddata",
  initialState: {
    recentlyviewedataa: [], // Array to hold recently viewed movie details
  },
  reducers: {
    addRecentlyVieweddata: (state, action) => {
      state.recentlyviewedataa = [...state.recentlyviewedataa, action.payload];
    },
    clearRecentlyVieweddata: (state) => {
      state.recentlyviewedataa = []; // Clear the array of recently viewed movie details
    },
  },
});

export default RecentlyViewedSlice.reducer;
export const { addRecentlyVieweddata, clearRecentlyVieweddata } = RecentlyViewedSlice.actions;
