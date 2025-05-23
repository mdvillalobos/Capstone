import axios from "axios";
import useToast from '../Helpers/useToast.jsx';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";

const useAddCredential = () => {
    const { getProfileOnLogin } = useContext(UserContext)

    const AddCredential = async (itemToUpload, setUploading, setIsOpen, setData) => {
        const id = Date.now();
        setUploading(prev => [{ id: id, fileName: itemToUpload.file.name, status: 'uploading'}, ...prev ])
        setIsOpen(false)
        setData({ documentCategory: '', documentType: '', file: null, value: null, tags: []})

        try {
            const formData = new FormData();
            formData.append('documentCategory', itemToUpload.documentCategory)
            formData.append('documentType', itemToUpload.documentType)
            formData.append('file', itemToUpload.file);
            itemToUpload.tags.forEach(tag => {
                formData.append('documentTags[]', tag);
            });
            
        
            if(itemToUpload.metricsValue) formData.append('metricsValue', itemToUpload.metricsValue);

            const { data } = await axios.post('/api/addCredential', formData);

            setUploading(prev => 
                prev.map(item => 
                    item.id === id 
                        ? { ...item, status: data.error ? 'error' : 'done' }
                        : item
                )
            )

            if(!data.error) {
                setTimeout(() => {
                    setUploading(prev => prev.filter(item => item.id !== id))
                }, 3000)
            }
        }
        catch (error) {
            console.error(`Error Adding Education ${ error.message }`);
            setUploading(prev => 
                prev.map(item => 
                    item.id === id 
                        ? { ...item, status: 'error' }
                        : item
                )
            )
        }
    }

    return { AddCredential }
}

export default useAddCredential
