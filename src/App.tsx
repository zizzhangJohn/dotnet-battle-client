import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar"
import { GlobalContext, User } from "./GlobaContext"
import { PrivateRoutes } from "./Routes/PrivateRoutes";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./Routes/HomePage";
import CharactersPage from "./Routes/CharactersPage";
import FightPage from "./Routes/FightPage";
import { ProfilePage } from "./Routes/ProfilePage";
import ErrorPage from "./Routes/ErrorPage/ErrorPage";



function App() {
  const [user, setUser] = useState<User | null>(null);

  
  return (
    <>
      <GlobalContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route element={<PrivateRoutes user={user} />}>
              <Route path='characters' element={<CharactersPage />} />
              <Route path='fight' element={<FightPage />} />
            </Route>
            <Route path='profile' element={<ProfilePage />} />
            <Route path='*' element={<ErrorPage />}/>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  )
}

export default App
