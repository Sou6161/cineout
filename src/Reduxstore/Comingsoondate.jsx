import { createSlice } from "@reduxjs/toolkit";
export const Comingsoondate = createSlice({
  name: "comingsoondate",
  initialState: {
    comingsoondateshowit: [],
  },
  reducers: {
    addcomingsoondate: (state, actions) => {
      state.comingsoondateshowit = actions.payload;
      // console.log("Payload received of date:", actions.payload);
    },
  },
});
export default Comingsoondate.reducer;
export const { addcomingsoondate } = Comingsoondate.actions;
