import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      // console.log(action.payload)  
      return action.payload;
    },
    removeUser: (state, action) => {},
  },
});

export const { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
