import React, { useContext, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversion } from '../contexts/ConversionsProvider'

export default function NewConversionModal({ closeModal }) {

    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts();
    const { createConversion } = useConversion();

    function handleSubmit(e) {
        e.preventDefault();

        createConversion(selectedContactIds)
        closeModal()
    }

    //if the id in the list, delete it. otherwise - add it to the list
    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prev => {
            if (prev.includes(contactId)) {
                return prev.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prev, contactId]
            }
        })
    }

    return (
        <>
            <Modal.Header closeButton > Create Conversion   </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}
                            />
                        </Form.Group>
                    ))}

                    <Button type="submit">Create</Button>

                </Form>
            </Modal.Body>

        </>
    )
}
