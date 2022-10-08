import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ImgsReducer from "../reducers/imgsReducer";
const rootReducer = combineReducers({
  ImgsReducer,
});
export type store = {
  ImgsReducer: typeof ImgsReducer;
};
const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export default setupStore;
