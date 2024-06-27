const { combineReducers, configureStore } = require("@reduxjs/toolkit");
const userReducer = require("../slices/userSlice").default; // Assuming userSlice.js exports a default reducer
const storage = require("redux-persist/lib/storage").default;
const { persistReducer } = require("redux-persist");
const { useDispatch, useSelector } = require("react-redux");

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["userData"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Redux Persist
    }),
});
