import React from "react";
import Sidebar from "./Sidebar";

import OpenConversions from "./OpenConversions";
import { useConversions } from "../contexts/ConversionsProvider";

export default function Dashboard({ id }) {
  const { selectedConversion } = useConversions();

  return (
    <div className="d-flex" style={{height:'99vh'}}>
      <Sidebar id={id} />
      {selectedConversion && <OpenConversions />}

    </div>
  );
}
