import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateResourcePage from "./components/CreateResourcePage";
import {
  NoUserInterface,
  ResourceInfo,
  UserInterface,
} from "./components/Interfaces";
import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";
import StudyList from "./components/StudyList";

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<
    UserInterface | NoUserInterface
  >({ user_id: "not-signed-in" });
  const [studylist, setStudylist] = useState<ResourceInfo[]>([]);

  return (
    <>
      <BrowserRouter>
        <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                studylist={studylist}
              />
            }
          ></Route>
          <Route
            path="/create"
            element={
              <CreateResourcePage
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          ></Route>
          <Route
            path="/study-list"
            element={
              <StudyList
                currentUser={currentUser}
                studylist={studylist}
                setStudylist={setStudylist}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
