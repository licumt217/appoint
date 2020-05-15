
import {createStore,combineReducers,applyMiddleware} from 'redux'

import {persistStore,persistReducer} from "redux-persist";

import storage from "redux-persist/lib/storage/session";

import {createLogger} from 'redux-logger'

import thunk from "redux-thunk";

import reducers from "./reducers";

const persistConfig={
    key:'root',
    storage
}

const persistedReducer=persistReducer(persistConfig,reducers)



const store=createStore(persistedReducer,{
},applyMiddleware(thunk,createLogger()))

store.batchDispatch=(array)=>{
    array.forEach(item=>{
        store.dispatch(item)
    })
}

store.clear=(array)=>{
    store.dispatch({
        type:'login',
        payload:false
    })
    sessionStorage.clear()
}


const persistor=persistStore(store)

export {store,persistor}

export default store

