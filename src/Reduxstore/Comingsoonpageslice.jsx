import { createSlice } from "@reduxjs/toolkit";
export const Comingsoonpageslice = createSlice({
  name: "comingsoonpage",
  initialState: {
    comingsoonpage: [],
  },
  reducers: {
    addcomingsoonpage: (state, actions) => {
      state.comingsoonpage = actions.payload;
      // console.log("Payload received of date:", actions.payload);
    },
  },
});
export default Comingsoonpageslice.reducer;
export const { addcomingsoonpage } = Comingsoonpageslice.actions;
