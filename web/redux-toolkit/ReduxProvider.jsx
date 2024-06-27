"use client";
import { store } from "@/redux-toolkit/store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
persistStore(store);

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
