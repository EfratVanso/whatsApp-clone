import React, { useContext, useState, useEffect } from 'react'
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',
            {query:{id}}
        )
        setSocket(newSocket)
        return () => {
            newSocket.close()
        }
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

//https://www.youtube.com/watch?v=tBr-PybP_9c&t=1757s 1:30

