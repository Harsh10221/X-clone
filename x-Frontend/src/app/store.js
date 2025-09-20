import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "../features/Slices/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 1. Combine your reducers into a single rootReducer object
const rootReducer = combineReducers({
    user: userDataReducer,
    // Add other reducers here if you have them
});

// 2. Create the persistConfig
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'] // Specify which reducers to persist. Here, we only persist the 'user' slice.
};

// 3. Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    // Add middleware to ignore serializability checks for redux-persist actions
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// 5. Create and export the persistor
export const persistor = persistStore(store);