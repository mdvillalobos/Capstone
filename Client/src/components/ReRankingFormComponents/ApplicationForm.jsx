import { useContext, useState } from 'react';
import axios from 'axios';
import { RankContext } from '../../../context/rankContext.jsx';
import { Link } from 'react-router-dom';
import PersonalInfoFields from './PersonalInfoFields.jsx';
import RequirementFields from './RequirementFields.jsx';
import useUpdateApplication from '../../hooks/UserHooks/useUpdateApplication.jsx';
import { UserContext } from '../../../context/userContext.jsx';

const ApplicationForm = () => {
    const { ranks, config } = useContext(RankContext);
    const { applicationData, setApplicationData } = useContext(UserContext);
    const { updateApplication } = useUpdateApplication();

    
    const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === applicationData?.applyingFor);

    const [ isEditEnable, setIsEditEnable ] = useState(false)
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ requirements, setRequirements ] = useState(applicationData?.requirements);

    const fetchApplication = () => {
        axios.get(`/api/getEntry?academicYear=${config?.academicYear}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err))
    }

    const handleUpdateApplication = async () => {
        try {
            setIsSubmitted(true)
            const result = await updateApplication(applicationData._id, requirements)

            if(result.success) {
                setApplicationData(result.updatedData)
            }
        }
        finally {
            setIsSubmitted(false)
        }
    }
    
    return (
        <div>
            <div className='px-6 py-4 border-2 border-BorderColor rounded-mx rounded-xl'>
                <div className="flex justify-between pb-2">
                    <h1 className='formTitle'>Faculty Ranking Form</h1>
                    <h1 className='formTitle'>{applicationData?.applyingFor}</h1>
                </div>
                <PersonalInfoFields
                    name={applicationData?.name}
                    college={applicationData?.college}
                    department={applicationData?.department}
                    currentRank={applicationData?.currentRank}
                    status={applicationData?.userStatus}
                    academicYear={applicationData?.academicYear}
                />

                <div className='py-3'>
                    <h1 className='text-base font-semibold text-NuBlue'>Qualification</h1>
                    
                    {selectedRank?.requirements.map((requirement, i) => (
                        <RequirementFields
                            key={requirement._id}
                            requirementDescription={requirement.description}
                            userDocuments={requirements[i]}
                            setRequirements={setRequirements}
                            isEditEnable={isEditEnable}
                        />
                    ))}
                </div>
            </div>

            <div className='flex justify-end mt-4'>
                {applicationData?.applicationStatus === 'Return' || applicationData?.applicationStatus === 'For verification' ? (
                    isEditEnable ? ( 
                        <div className='space-x-4'>
                            <button type='button' onClick={() => {setIsEditEnable(false), location.reload()}} className='w-32 py-2 font-medium duration-300 bg-gray-300 rounded-lg cursor-pointer hover:shadow-lg'>Cancel</button>
                            <button type="button" onClick={handleUpdateApplication} disabled={isSubmitted} className='w-32 py-2 text-white rounded-lg cursor-pointer bg-NuBlue hover:shadow-lg'>Update</button>
                        </div>
                    ) : (
                        <button type='button' className='px-12 py-2 text-white duration-300 rounded-lg cursor-pointer ext-sm bg-NuBlue hover:bg-NuLightBlue' onClick={() => setIsEditEnable(!isEditEnable)}>Edit</button>
                    )
                ) : (
                    <Link to='/application' className='w-32 py-2 font-medium text-center duration-300 bg-gray-300 rounded-lg cursor-pointer hover:shadow-lg'>Back</Link>
                )}
            </div>
        </div>
    )
}

export default ApplicationForm
