import {
  FETCH_ALL,
  CREATE_QUEST,
  DELETE_QUEST,
  END_LOADING_QUEST,
  FETCH_QUIZ,
  RESET,
  START_LOADING_QUEST,
  UPDATE_QUEST,
} from "../layout/app-action";
import { displayToast } from "../util/alert";

const questReducer = (
  state = { isLoading: true, Quiz: [], allQuest: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING_QUEST: {
      return { ...state, isLoading: true };
    }
    case END_LOADING_QUEST: {
      return { ...state, isLoading: false };
    }
    case FETCH_ALL:
      return { ...state, allQuest: action.payload };
    case CREATE_QUEST:
      displayToast(`ქვიზი წარმატებით დაემატა`, "success", "green");
      return { ...state, allQuest: action.payload };
    case UPDATE_QUEST:
      displayToast(`ქვიზი წარმატებით განახლდა`, "success", "green");
      return {
        ...state,
        allQuest: state.allQuest.map((Quest) =>
          Quest._id === action.payload._id ? action.payload : Quest
        ),
      };
    case DELETE_QUEST:
      displayToast(`${action.payload.message}`, "success", "green");
      return {
        ...state,
        allQuest: state.allQuest.filter(
          (Quest) => Quest._id !== action.payload.QuestId
        ),
      };
    case FETCH_QUIZ:
      return { ...state, Quiz: action.payload };
    case RESET:
      return { ...state, Quiz: [], isLoading: true };
    default:
      return state;
  }
};
export default questReducer;
