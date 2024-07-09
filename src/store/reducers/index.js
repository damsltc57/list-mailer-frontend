// third-party
import { combineReducers } from "redux";

// project import
import user from "./userSlice";
import { api } from "../api/rtkApi";
import menu from "./menu";
import contact from "./contactSlice";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ [api.reducerPath]: api.reducer, menu, user, contact });

export default reducers;
