import { combineReducers } from "redux";

import eventsReducer from "./eventReducer";

const rootReducer = combineReducers({
    events: eventsReducer,
});

export default rootReducer;
