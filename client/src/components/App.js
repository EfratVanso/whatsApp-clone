import React from "react";
import Login from "./Login";
import Dashboard from './Dashboard'
import useLocalStorage from "../hooks/useLocalStorage";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversionProvider } from "../contexts/ConversionsProvider";
import { SocketProvider } from "../contexts/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversionProvider id={id}>
          <Dashboard id={id} />
        </ConversionProvider>
      </ContactsProvider>
    </SocketProvider>)

  return (<>
    {id ? dashboard : <Login onIdSubmit={setId} />}
    {/* if there is selected cobversiion, show it */}
  </>)
}

export default App;
