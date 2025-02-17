import { BrowserRouter,Routes,Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore"
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import 'react-toastify/dist/ReactToastify.css'
import Requests from "./components/Requests";
import AddNewPost from "./components/AddNewPost";
import SomeOnesProfile from "./components/SomeOnesProfile";
export default function App() {
  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Login />}/>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/connections" element={<Connections/>}/>
          <Route path="/newPost" element={<AddNewPost/>}/>
          <Route path="/requests" element={<Requests/>}/>
          <Route path="/someonesprofile" element={<SomeOnesProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      </Provider>
    </>
   
  )
}