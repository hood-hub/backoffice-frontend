// redux/reducers/userReducer.ts

import { UPDATE_USER_PROFILE } from "../action/userActions";



const initialState = {
  user: null, // This will hold the user data
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: action.payload, // Update the user profile in state
      };
    default:
      return state;
  }
};

export default userReducer;
