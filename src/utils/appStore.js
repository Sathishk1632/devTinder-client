import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import feed from "./feedSlice"
import connections from "./connectionSlice";
import requests from "./requestsSlice";

const appStore=configureStore({
    reducer:{user,feed,connections,requests},
})
export default appStore;