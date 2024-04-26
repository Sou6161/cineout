import { createSlice } from "@reduxjs/toolkit";

export const MovieNewsSlice = createSlice({
  name: "movienewsslice",
  initialState: {
    MovieNewsSlice: [],
  },
  reducers: {
    addMovieNewsSlice: (state, actions) => {
      state.MovieNewsSlice = actions.payload;
      // console.log("Payload received of date:", actions.payload);
    },
  },
});
export default MovieNewsSlice.reducer;
export const { addMovieNewsSlice } = MovieNewsSlice.actions; // Corrected here
