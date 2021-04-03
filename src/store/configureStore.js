import { configureStore } from "@reduxjs/toolkit";

// import themesReducer from "../features/themes/themesSlice";

const store = configureStore({
  reducer: {
    // themes: themesReducer,
  },
});

export default store;
