import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversions } from '../contexts/ConversionsProvider'

export default function Conversions() { 
    const { conversions, selectConversionIndex } = useConversions()
    return (
        <>
            <ListGroup variant="flush">
                {conversions.map((conversion, index) => (
                    <ListGroup.Item
                     key={index}
                     action
                     onClick={()=> selectConversionIndex(index) }
                     active={conversion.selected}
                     >
                        {conversion.recipients.map(r => r.name).join(', ')}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}
