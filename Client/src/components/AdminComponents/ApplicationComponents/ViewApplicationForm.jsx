import { useState, useContext, useEffect, useCallback } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine, RiArrowUpSLine } from "react-icons/ri";

import useSubmitReview from '../../../hooks/AdminHooks/useSubmitReview.jsx';
import useToast from '../../../hooks/Helpers/useToast.jsx';

import RequirementFields from '../../ReRankingFormComponents/RequirementFields.jsx';
import PersonalInfoFields from '../../ReRankingFormComponents/PersonalInfoFields.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';

const ViewApplicationForm = ({ rest }) => {
    const { ranks } = useContext(RankContext);
    const { Toast } = useToast();
    const { submitReview } = useSubmitReview();

    const [ isVerdictOpen, setIsVerdictOpen ] = useState(false)
    const [ selectedVerdict, setSelectedVerdict ] = useState('Approved');
    const [ remarks, setRemarks ] = useState([]);
    const [ isConfirmationOpen, setIsConfirmationOpen ] = useState(false)
     const [ isSubmitted, setIsSubmitted ] = useState(false);

    const options = ['Approved', 'Decline', 'Return'];
    const rankData = ranks?.find(requirement => requirement.rankName === rest?.applyingFor);

    useEffect(() => {
        if (rankData?.requirements?.length) {
            const initialRemarks = rankData.requirements.map(req => ({
                requirementDes: req.description,
                comment: ''
            }));
            setRemarks(initialRemarks);
        }
    }, [rankData]);

    const updateRemarks = useCallback((index, userRemaks) => {
        setRemarks(prev => {
            const updated = [...prev]
            updated[index].comment = userRemaks
            return updated
        })
    }, [])

    const handleSubmitReview = async (e) => {
        try {
            setIsSubmitted(true);
            await submitReview(rest?._id, selectedVerdict, remarks)
        } finally {
            setIsSubmitted(false)
        }
    }

    return (
        <div>
            {isConfirmationOpen && (
                <ConfirmationModal
                    verdict={selectedVerdict}
                    handleExit={() => setIsConfirmationOpen(false)}
                    handleSubmit={handleSubmitReview}
                />
            )}
            <div className='px-6 py-4 border-2 border-BorderColor rounded-mx rounded-xl'>
                <div className="flex justify-between pb-2">
                    <h1 className='formTitle'>Faculty Ranking Form</h1>
                    <h1 className='formTitle'>{rest?.applyingFor}</h1>
                </div>
                <PersonalInfoFields 
                    name={rest?.name}
                    college={rest?.college}
                    department={rest?.department}
                    currentRank={rest?.currentRank}
                    status={rest?.userStatus}
                    academicYear={rest?.academicYear}
                />
                <div className='py-3'>
                    <h1 className='text-base font-semibold text-NuBlue'>Qualification</h1>

                    {rankData?.requirements.map((requirement, index) => {
                        return (
                            <RequirementFields
                                key={requirement._id}
                                requirementDescription={requirement.description}
                                userDocuments={rest?.requirements[index]} 
                                handleChangeRemarks={(userRemarks) => updateRemarks(index, userRemarks)}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="relative flex justify-end mt-4 space-x-4 text-sm">
                <Link to='/admin/application' className='flex items-center justify-center w-32 font-medium duration-300 bg-gray-300 rounded-lg cursor-pointer hover:shadow-lg'>
                    Cancel
                </Link>

                <div className='flex'>
                    <button 
                        type='button' 
                        className="px-2 py-2 text-white rounded-l-lg shadow cursor-pointer bg-NuBlue focus:outline-none focus:ring w-28" 
                        onClick={() => setIsConfirmationOpen(true)}
                    >
                        {selectedVerdict}
                    </button>
                    <button 
                        type='button' 
                        className='flex-1 py-2 rounded-r-lg shadow focus:outline-none focus:ring cursor-pointer text-2xl bg-[#a2b0ed]' 
                        onClick={() => setIsVerdictOpen(!isVerdictOpen)}
                    >
                        {isVerdictOpen ? <RiArrowUpSLine/> : <RiArrowDropDownLine/>}
                    </button>

                    {isVerdictOpen ? (
                        <div className='absolute right-0 flex flex-col mb-1 font-medium bg-white border rounded-md shadow border-BorderColor bottom-full w-34'>
                            {options.map((opt, index) => (
                                <button
                                    key={index}
                                    type='button'
                                    onClick={() => { setSelectedVerdict(opt), setIsVerdictOpen(false)}}    
                                    className='cursor-pointer px-4 py-2 hover:bg-[#ebebeb] duration-300'
                                    disabled={isSubmitted}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default ViewApplicationForm

