import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RankContext = createContext({});

export const RankContextProvider = ({ children }) => {
    const [ ranks, setRanks ] = useState(null);
    const [ config, setConfig ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    
    const getApplicationConfig = async () => {
        try {
            const [ getProfile, getConfiguration ] = await Promise.all([
                axios.get('/api/getAllRank'),
                axios.get('/api/getConfiguration')
            ]);
            
            setRanks(getProfile.data);
            setConfig(getConfiguration.data)

        } catch (error) {
            console.error(`Fetching Application Configurations Error: ${ error.message }`);
            setRanks(null);
            setConfig(null);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getApplicationConfig();
    }, [])

    const fetchApplicationConfigOnLogin = async () => {
        await getApplicationConfig();
    };

    return (
        <RankContext.Provider value={{ ranks, setRanks, config, setConfig, fetchApplicationConfigOnLogin, loading}}>
            {children}
        </RankContext.Provider>
    )
}
