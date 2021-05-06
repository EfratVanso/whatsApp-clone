import React, { useContext, useState } from 'react'
//import contacts from '../components/Contacts'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversionContext = React.createContext()

export function useConversions() {
    return useContext(ConversionContext)
}

export function ConversionProvider({ children }) {

    const [conversions, setConversions] = useLocalStorage('Conversions', [])
    const [selectedConversionIndex, setSelectedConversionIndex] = useState(0)
    const { contacts } = useContacts()

    function createConversion(recipients) {
        setConversions(prevConversion => {
            return [...prevConversion, { recipients, messages: [] }]
        })
    }

    //get the names of the recipients from their id's
    const formattedConversions = conversions.map((conversion, index) => {
        const recipients = conversion.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name }
        })
        const selected = index === selectedConversionIndex
        return { ...conversion, recipients, selected }
    })


    return (
        <ConversionContext.Provider value={{
            conversions: formattedConversions,
            selectConversionIndex: setSelectedConversionIndex,
            selectedConversion: formattedConversions[selectedConversionIndex],
            createConversion
        }}>
            {children}
        </ConversionContext.Provider>
    )
}
