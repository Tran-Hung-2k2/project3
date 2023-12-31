import { applyMiddleware, combineReducers, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import auth from './auth/auth.reducer';
import parking from './parking/parking.reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
    whitelist: ['auth', 'parking'],
};

const rootReducer = combineReducers({
    auth,
    parking,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialState = {};

const store = configureStore({
    reducer: persistedReducer,
    initialState,
    middleware: [thunk],
});

export const persistor = persistStore(store, {}, () => {
    persistor.persist();
});

export default store;
