import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [ user, setUser ] = useState();
    const [ credentials, setCredentials ] = useState(null);
    
    const checkAuth = async () => {
        try {
            const getProfile = await axios.get('/api/getProfile')
            setUser(getProfile.data);

            console.log(getProfile)


            if(getProfile.data.role === 'user' && getProfile.accountInfo?.[0].length > 0) {
                const getCredentials = await axios.get('/api/getUserCredentials');
                setCredentials(getCredentials.data)
            }
        
        } catch (error) {
            console.error(`Fetching User Information Error: ${ error.message }`);
            setUser(null);
            setCredentials(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const getProfileOnLogin = () => {
        checkAuth();
    }

    return (
        <UserContext.Provider value={{ user, setUser, credentials, setCredentials, getProfileOnLogin }}>
            {children}
        </UserContext.Provider>
    )
}
