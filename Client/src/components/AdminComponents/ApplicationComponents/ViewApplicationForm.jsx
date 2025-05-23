import { useState, useContext, useEffect, useCallback } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine, RiArrowUpSLine } from "react-icons/ri";

import useSubmitReview from '../../../hooks/AdminHooks/useSubmitReview.jsx';
import useToast from '../../../hooks/Helpers/useToast.jsx';

import RequirementFields from '../../ReRankingFormComponents/RequirementFields.jsx';
import PersonalInfoFields from '../../ReRankingFormComponents/PersonalInfoFields.jsx';

const ViewApplicationForm = ({ rest }) => {
    const { ranks } = useContext(RankContext);
    const { Toast } = useToast();
    const { submitReview } = useSubmitReview();

    const [ isVerdictOpen, setIsVerdictOpen ] = useState(false);
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ selectedVerdict, setSelectedVerdict ] = useState('Approved');
    const [remarks, setRemarks] = useState([]);

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
        e.preventDefault();

        setIsSubmitted(true);
        await submitReview(rest?._id, selectedVerdict, remarks)
    }

    const options = ['Approved', 'Decline', 'Return'];


    return (
        <div>
            {/* {isSubmitted && (
                <ConfirmModal 
                    handleExit={() => setIsSubmitted(!isSubmitted)}
                    decision={decision}
                    handleSubmit={handleSubmitReview}
                />
            )} */}
            {/* {isRemarksOpen && (
                <Remarks
                    handleSubmit={() => { setIsSubmitted(!isSubmitted), setIsRemarkOpen(!isRemarksOpen) }}
                    handleExit={() => setIsRemarkOpen(!isRemarksOpen)}
                    remarks={remarks}
                    setRemarks={setRemarks}
                />
            )} */}
            <div className='px-6 py-4 border-2 border-gray-200 rounded-mx rounded-xl'>
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
                    <button type='button' className="px-2 py-2 text-white rounded-l-lg shadow cursor-pointer bg-NuBlue focus:outline-none focus:ring w-28" onClick={handleSubmitReview}>
                        {selectedVerdict}
                    </button>
                    <button type='button' className='flex-1 py-2 rounded-r-lg shadow focus:outline-none focus:ring cursor-pointer text-2xl bg-[#a2b0ed]' onClick={() => setIsVerdictOpen(!isVerdictOpen)}>
                        {isVerdictOpen ? (
                            <RiArrowUpSLine/>
                        ) : (
                            <RiArrowDropDownLine/>
                        )}
                    </button>

                    {isVerdictOpen ? (
                        <div className='absolute right-0 flex flex-col mb-1 font-medium bg-white border border-gray-200 rounded-md shadow bottom-full w-34'>
                            <button onClick={() => { setSelectedVerdict('Approve'), setIsVerdictOpen(false) }} className='cursor-pointer px-4 py-2 hover:bg-[#ebebeb] duration-300'>Approve</button>
                            <button onClick={() => { setSelectedVerdict('Decline'), setIsVerdictOpen(false) }} className='cursor-pointer px-4 py-2 hover:bg-[#ebebeb] duration-300'>Decline</button>
                            <button onClick={() => { setSelectedVerdict('Return'), setIsVerdictOpen(false) }} className='cursor-pointer px-4 py-2 hover:bg-[#ebebeb] duration-300'>Return</button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default ViewApplicationForm


const ConfirmModal = ({ handleExit, decision, handleSubmit }) => {
    return (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen overflow-auto bg-black/40 font-Poppins">
            <div className="h-[35%] w-[32%] bg-white shadow-lg rounded-2xl px-6 py-6 space-y-5 overflow-hidden fade-in max-sm:h-[72%] max-sm:w-[85%]">
                <div className="flex flex-col items-center h-full">
                    <button type='button' onClick={handleExit} className='absolute px-2 text-4xl translate-y-1 rounded-full right-2 top-1 duration hover:bg-gray-200'>&times;</button>
                    <div className="mt-4 space-y-4 text-center">
                        <h1 className='text-4xl font-semibold'>Are you sure?</h1>
                        <p className=''>
                            Are you sure you want to {decision === 'Approved' ? (<span className='mr-1 font-medium text-green-600'>{decision}</span>) : (<span className='mr-1 font-medium text-red-600'>{decision}</span>)} 
                            this application? <br/>This action cannot be undone.
                        </p>
                    </div>

                    <div className="mt-10 space-x-4">
                        <button type='button' className='py-2.5 w-48 rounded-md duration-200 border-2 border-black hover:bg-gray-100' onClick={handleExit}>Cancel</button>
                        <button type='button' onClick={handleSubmit} className='py-2.5 w-48 rounded-md bg-NuButton duration-200 text-white hover:bg-NuButtonHover'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

