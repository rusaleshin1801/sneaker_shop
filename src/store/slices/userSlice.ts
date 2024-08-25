import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  firstName: string | null;
  lastName: string | null;
}

const initialState: User = {
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clearUser: (state) => {
      state.firstName = null;
      state.lastName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
