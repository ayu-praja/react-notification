import { ADD_NOTIFICATION,REMOVE_NOTIFICATION } from "../../constant";

const initialState = [];

export default function addNotificationReducer(state=initialState,action) {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return [...state, {...action.payload}];
            
        case REMOVE_NOTIFICATION:
            return state.filter(el => el.id !== action.payload.id);
    
            default: {
                return state;
            }
    }
}

