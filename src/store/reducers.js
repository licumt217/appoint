import {combineReducers} from "redux";
import Role from "../assets/js/Role";

const login = (state = false, action) => {
    if(action.type==='login'){
        return action.payload||false;
    }else{
        return state;
    }

};

const user_id = (state = '', action) => {
    if(action.type==='user_id'){
        return action.payload;
    }else{
        return state;
    }
};

const user_name = (state = '', action) => {
    if(action.type==='user_name'){
        return action.payload;
    }else{
        return state;
    }
};

const openid = (state = '', action) => {
    if(action.type==='openid'){
        return action.payload;
    }else{
        return state;
    }
};

const token = (state = '', action) => {
    if(action.type==='token'){
        return action.payload;
    }else{
        return state;
    }
};

const role = (state = Role.therapist, action) => {
    if(action.type==='role'){
        return action.payload;
    }else{
        return state;
    }
};





let reducers=combineReducers({
    login,
    openid,
    user_id,
    user_name,
    role,
    token,
})

export default reducers;
