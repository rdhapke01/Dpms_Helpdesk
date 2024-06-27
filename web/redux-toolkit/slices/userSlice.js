import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userData: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    getUserData: (state) => {
      return state;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.users.push(...action.payload);
  //   });

  //   builder.addCase(fetchUsers.pending, (state, action) => {
  //     state.loading = true;
  //   });
  // },
});

export const { getUserData, setUserData } = userSlice.actions;

export default userSlice.reducer;
