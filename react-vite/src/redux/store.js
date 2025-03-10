import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import userReducer from "./users";
import courseReducer from "./courses";
import commentReducer from "./comments";
import pageReducer from "./pages";
import siteReviewReducer from "./site-review";

const rootReducer = combineReducers({
  session: sessionReducer,
  users: userReducer,
  courses: courseReducer,
  comments: commentReducer,
  pages: pageReducer,
  siteReviews: siteReviewReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
