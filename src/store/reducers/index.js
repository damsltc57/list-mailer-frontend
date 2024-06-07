// third-party
import { combineReducers } from "redux";

// project import
import user from "./userSlice";
import { api } from "../api/rtkApi";
import menu from "./menu";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ [api.reducerPath]: api.reducer, menu, user });

export default reducers;
