import { useState } from "react";
import { GlobalContext, User } from "./GlobaContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/*
Routes
*/
import HomePage from "./Routes/HomePage";
import CharactersPage from "./Routes/CharactersPage";
import FightPage from "./Routes/FightPage";
import ProfilePage from "./Routes/ProfilePage";
import ErrorPage from "./Routes/ErrorPage/ErrorPage";
import PrivateRoutes from "./Routes/PrivateRoutes";
/*
components
*/
import NavBar from "./Components/NavBar";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [fightResult, setFightResult] = useState<Array<string>>([]);

  return (
    <>
      <GlobalContext.Provider
        value={{ user, setUser, fightResult, setFightResult }}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoutes user={user} />}>
              <Route path="characters" element={<CharactersPage />} />
              <Route path="fight" element={<FightPage />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
