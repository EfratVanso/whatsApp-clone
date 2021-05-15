import React, { useContext, useState } from 'react'
//import contacts from '../components/Contacts'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversionContext = React.createContext()

export function useConversions() {
    return useContext(ConversionContext)
}

export function ConversionProvider({ id, children }) {

    const [conversions, setConversions] = useLocalStorage('Conversions', [])
    const [selectedConversionIndex, setSelectedConversionIndex] = useState(0)
    const { contacts } = useContacts()
    const socket = use

    function createConversion(recipients) {
        setConversions(prevConversion => {
            return [...prevConversion, { recipients, messages: [] }]
        })
    }

    function addMessageToConversion({ recipients, text, sender }) {
        setConversions(prevConversions => {
            let madeChange = false;
            const newMessage = { sender, text }

            const newConversion = prevConversions.map(conversion => {
                if (arrayEquality(conversion.recipients, recipients)) {// if such conversion exists, add the message to it
                    madeChange = true
                    return { ...conversion, messages: [...conversion.messages, newMessage] }
                }
                return conversion// else create new one
            })//newConversion

            if (madeChange) {
                return newConversion
            } else {
                return [...prevConversions, { recipients, messages: [newMessage] }]
            }
        })//setConversions
    }
    function sendMessage(recipients, text) {
        addMessageToConversion({ recipients, text, sender: id })
    }


    //get the names of the recipients from their id's/ messages
    const formattedConversions = conversions.map((conversion, index) => {
        const recipients = conversion.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })

        const messages =conversion.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender

           const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversionIndex
        return { ...conversion, messages, recipients, selected }// return each conversions with its data
    })


    return (
        <ConversionContext.Provider value={{
            conversions: formattedConversions,
            selectConversionIndex: setSelectedConversionIndex,
            sendMessage,
            selectedConversion: formattedConversions[selectedConversionIndex],
            createConversion
        }}>
            {children}
        </ConversionContext.Provider>
    )
}


//===============check if 2 arrays are equal
function arrayEquality(a, b) {
    if (a.length !== b.length) {
        return false
    }

    a.sort();
    b.sort();

    return a.every((element, index) => {
        return element === b[index]
    })
}