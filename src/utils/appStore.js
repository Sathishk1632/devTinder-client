import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import feed from "./feedSlice"
import connections from "./connectionSlice";

const appStore=configureStore({
    reducer:{user,feed,connections},
})
export default appStore;