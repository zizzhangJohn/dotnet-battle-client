import { useState } from "react";
import { Outlet } from "react-router-dom"
import NavBar from "./Components/NavBar"
import { GlobalContext, User } from "./UserContext"
function App() {
  const [user, setUser] = useState<User|null>(null);
  return (
    <>
      <GlobalContext.Provider value={{user, setUser}}>
        <NavBar />
        <Outlet />
      </GlobalContext.Provider>
    </>
  )
}

export default App
