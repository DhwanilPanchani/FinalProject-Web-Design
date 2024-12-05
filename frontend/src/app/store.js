import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default localStorage for web
import authReducer from '../features/authSlice'; // Update the path as necessary

// Configuration for redux-persist
const persistConfig = {
  key: 'auth', // Unique key for this slice
  storage, // Use localStorage for persistence
};

// Persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Add persisted auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Persistor for persisting the store
export const persistor = persistStore(store);

// Export the store
export default store;
