import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [ user, setUser ] = useState();
    const [ credentials, setCredentials ] = useState();
    const [ applicationData, setApplicationData ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const { data: profileData} = await axios.get('/api/getProfile')
            setUser(profileData);

            if(profileData.role === 'user' && profileData.firstName) {
                const { data: userCredentials } = await axios.get('/api/getUserCredentials');
                setCredentials(userCredentials)
            }
            else {
                setCredentials(null);
            }
        
        } catch (error) {
            console.error(`Fetching User Information Error: ${ error.message }`);
            setUser(null);
            setCredentials(null);
        }
        finally {
            setLoading(false)
        }
    };

    const getProfileOnLogin = useCallback(() => {
        fetchUserProfile();
    }, []);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, credentials, setCredentials, applicationData, setApplicationData, getProfileOnLogin, loading }}>
            {children}
        </UserContext.Provider>
    )
}
