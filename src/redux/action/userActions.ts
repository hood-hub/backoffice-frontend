// redux/actions/userActions.ts

import { Dispatch } from 'redux';
import apiClient from '../../utils/apiClient';

// Action Types
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

// Action Creators
export const updateUserProfile = (updatedUser: any) => {
  return {
    type: UPDATE_USER_PROFILE,
    payload: updatedUser,
  };
};

// Async Action to fetch and update user profile
export const fetchAndUpdateUserProfile = (userId: string, formData: FormData) => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient.put(`/user/update-profile/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      const updatedUser = response.data.data;
      dispatch(updateUserProfile(updatedUser)); // Dispatch the action with the updated user data
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};
