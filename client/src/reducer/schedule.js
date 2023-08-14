import {
  DELETE_SCHEDULE,
  EDIT_SCHEDULE,
  END_LOADING,
  FETCH_SCHEDULE,
  GROUP_SCHEDULE,
  POST_SCHEDULE,
  START_LOADING,
} from "../layout/app-action";

const scheduleReducer = (state = { isLoading: true, Schedule: [] }, action) => {
  switch (action.type) {
    case FETCH_SCHEDULE:
      return { ...state, Schedule: action.payload };

    case POST_SCHEDULE:
      return { ...state, Schedule: [...state.Schedule, action.payload] };

    case EDIT_SCHEDULE: {
      const updatedSchedule = state.Schedule.map((schedule) =>
        schedule._id === action.payload._id ? action.payload : schedule
      );

      return { ...state, Schedule: updatedSchedule };
    }

    case DELETE_SCHEDULE: {
      console.log(action);
      const filteredSchedule = state.Schedule.filter(
        (schedule) => schedule._id !== action.payload.scheduleId
      );
      return { ...state, Schedule: filteredSchedule };
    }

    case GROUP_SCHEDULE: {
      return { ...state, Schedule: action.payload };
    }

    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default scheduleReducer;
