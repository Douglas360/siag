import React from 'react'
import { AuthProvider } from './AuthContext/auth'
import { EventsProvider } from './EventsContext/index'
import { AdministrativeProvider } from './AdministrativeContext/index'
import { RegisterProvider } from './RegisterContext/index'




export const CombinedProvider = ({ children }) => {
    return (
        <AuthProvider>
            <EventsProvider>
                <AdministrativeProvider>
                    <RegisterProvider>
                        {children}
                    </RegisterProvider>                  
                </AdministrativeProvider>
            </EventsProvider>
        </AuthProvider>


    )
}
