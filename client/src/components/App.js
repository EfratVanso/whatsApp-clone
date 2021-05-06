import React from "react";
import Login from "./Login";
import Dashboard from './Dashboard'
import useLocalStorage from "../hooks/useLocalStorage";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversionProvider } from "../contexts/ConversionsProvider";

function App() {
const [id, setId] = useLocalStorage('id');

const dashboard = (
<ContactsProvider>
  <ConversionProvider>
      <Dashboard id={id}/>
  </ConversionProvider>
</ContactsProvider>)

  return (  <>
      {id? dashboard  :  <Login onIdSubmit={setId} />}

  </>)
}

export default App;
