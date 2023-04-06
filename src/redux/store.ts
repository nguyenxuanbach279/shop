import { configureStore, AnyAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import LoginPageSlice from "../slices/LoginPageSlice";
import { combineReducers } from "redux";
import CartSlide from "../slices/CartSlide";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  account: LoginPageSlice.reducer,
  cart: CartSlide.reducer,
});

const reducerProxy = (
  state: ReturnType<typeof reducer> | undefined,
  action: AnyAction
) => {
  if (action.type === "account/setLogoutAccount") {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, reducerProxy);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
