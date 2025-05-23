import { useContext, useState } from 'react';
import { RankContext } from '../../../context/rankContext.jsx';
import PersonalInfoFields from './PersonalInfoFields.jsx';
import RequirementFields from './RequirementFields.jsx';
import useUpdateApplication from '../../hooks/UserHooks/useUpdateApplication.jsx';

const ApplicationForm = ({ rest }) => {
    const { ranks } = useContext(RankContext);
    const { updateApplication } = useUpdateApplication();
    
    const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === rest?.applyingFor);

    const [ isEditEnable, setIsEditEnable ] = useState(false)
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ requirements, setRequirements ] = useState(rest?.requirements);

    const handleUpdateApplication = async (e) => {
        e.preventDefault();
        setIsEditEnable(true)
        await updateApplication(rest._id, requirements, setIsSubmitted)
    }
    
    return (
        <div>
            <div className='px-6 py-4 border-2 border-gray-200 rounded-mx rounded-xl'>
                <div className="flex justify-between pb-2">
                    <h1 className='formTitle'>Faculty Ranking Form</h1>
                    <h1 className='formTitle'>{rest?.applyingFor}</h1>
                </div>
                <PersonalInfoFields
                    name={rest.name}
                    college={rest.college}
                    department={rest.department}
                    currentRank={rest.currentRank}
                    status={rest.userStatus}
                    academicYear={rest.academicYear}
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
                {isEditEnable ? ( 
                    <div className='space-x-4'>
                        <button type='button' onClick={() => setIsEditEnable(false)} className='w-32 py-2 font-medium duration-300 bg-gray-300 rounded-lg cursor-pointer hover:shadow-lg'>Cancel</button>
                        <button type="button" onClick={handleUpdateApplication} disabled={isSubmitted} className='w-32 py-2 text-white rounded-lg cursor-pointer bg-NuBlue hover:shadow-lg'>Update</button>
                    </div>
                ) : (
                    <button type='button' className='px-12 py-2 text-white duration-300 rounded-lg cursor-pointer ext-sm bg-NuBlue hover:bg-NuLightBlue' onClick={() => setIsEditEnable(!isEditEnable)}>Edit</button>
                )}
            </div>
        </div>
    )
}

export default ApplicationForm
