import React, { useContext } from 'react'
import Contacts from '../components/Contacts'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversionContext = React.createContext()

export function useConversion() {
    return useContext(ConversionContext)
}

export function ConversionProvider({ children }) {

    const [conversions, setConversions] = useLocalStorage('Conversions', [])
    const { contacts } = useContacts()

    function createConversion(recipients) {
        setConversions(prevConversion => {
            return [...prevConversion, { recipients, messages: [] }]
        })
    }

    //get the names of the recipients from their id's
    const formattedConversions = conversions.map(conversion => {
        const recipients = conversion.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return {id: recipient, name}
        })
        return {... conversion, recipients}
    })


    return (
        <ConversionContext.Provider value={{ formattedConversions, createConversion }}>
            {children}
        </ConversionContext.Provider>
    )
}
