import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversions from "./Conversions";
import Contacts from "./Contacts";
import NewConntactModal from "./NewConntactModal";
import NewConversionModal from "./NewConversionModal";

const CONVERSIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const convesionsOpen = activeKey === CONVERSIONS_KEY;// true or false
  
  function  closeModal(){
    setModalOpen(false)
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="border-right overflow-auto flex-grow-1">
          {/* connected to the conversations nav.link: */}
          <Tab.Pane eventKey={CONVERSIONS_KEY}>
            <Conversions />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button className="rounded-0" onClick={()=> setModalOpen(true)}>
          New {convesionsOpen ? 'Conversion' : 'Contact'}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {convesionsOpen ?

          <NewConversionModal closeModal={closeModal}></NewConversionModal> :
          <NewConntactModal closeModal={closeModal}></NewConntactModal>
        }
      </Modal>
    </div>
  );
}
