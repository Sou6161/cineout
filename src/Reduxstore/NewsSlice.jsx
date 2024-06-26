import { createSlice } from "@reduxjs/toolkit";

export const NewsSlice = createSlice({
  name: "newsslice",
  initialState: {
    NewsSlice: [],
  },
  reducers: {
    addNewsSlice: (state, actions) => {
      state.NewsSlice = actions.payload;
      // console.log("Payload received of date:", actions.payload);
    },
  },
});

export default NewsSlice.reducer;
export const { addNewsSlice } = NewsSlice.actions;
