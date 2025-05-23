import { useState } from 'react'

const AddCredentialModal = ({ data, setData }) => {
    const [ isOpen, setIsOpen ] = useState(false);

    const serviceAndContribution = [
        'Community Service',
	    'Leadership Position',
	    'Membership'
    ]

    const technicalSkillsInnovation = [
        'Technical Innovation'
    ]

    const userChoice = data.documentCategory === 'Service & Contribution' ?  serviceAndContribution : technicalSkillsInnovation;

    return (
        <div className='relative'>
            <button 
                type='button' 
                onClick={() => setIsOpen(!isOpen)} 
                className={`fileInput ${data.documentType ? 'text-black' : 'text-gray-500'}`}
            >
                {data.documentType ||  'Select category'}
            </button>

            {isOpen && (
                <div className='fileSelect'>
                    {userChoice.map(userChoiceOptions => (
                        <button 
                            key={userChoiceOptions}
                            type='button' 
                            onClick={() => { 
                                const newTags = [...data.tags || []]
                                newTags[0] = userChoiceOptions;
                                setData({ ...data, documentType: userChoiceOptions, tags: newTags }),
                                setIsOpen(!isOpen)
                            }}
                            className='fileOption'
                        >
                            {userChoiceOptions}
                        </button>
                    ))}             
                </div>
            )}
        </div>
    )
}

export default AddCredentialModal