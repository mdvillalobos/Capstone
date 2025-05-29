import { useState, useEffect, useContext } from 'react';
import { RankContext } from '../../../../context/rankContext';
import { UserContext } from '../../../../context/userContext';
import { RiArrowDropDownLine,  RiArrowDropUpLine } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";

import ViewImage from './ViewImage';
import useSubmitApplication from '../../../hooks/ApplicationHooks/useSubmitApplication';

const Requirements = () => {
    const { SubmitForm } = useSubmitApplication();
    const { ranks, config } = useContext(RankContext);
    const { credentials, user } = useContext(UserContext);

    const [ isOpen, setIsOpen ] = useState(false);
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ confirm, setConfirm ] = useState(false);

    const [ selected, setSelected ] = useState('Instructor 2');
    const [ userRequirement, setUserRequirement ] = useState([]);

    const filterRankByTrack = ranks?.filter(rankBasedOnTrack => rankBasedOnTrack.track === user.track);
    const currentRankIndex = filterRankByTrack?.findIndex(rank => rank.rankName === user?.rank);
    const availableRank = filterRankByTrack?.slice(currentRankIndex + 1);
    const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === selected);

    useEffect(() => {
        if (ranks) {
            setSelected(availableRank.length > 0 ? availableRank[0].rankName : null);
        }
    }, [ranks, user.track]);

    useEffect(() => {
        if (!selectedRank || !credentials?.files) return;

        const getMatchedFiles = (requirement) => {
            return requirement.requiredDocument.reduce((acc, data) => {
                if (acc.some(item => item.requirementNumber === requirement.requirementNumber)) {
                    return acc;
                }

                const matchedFiles = credentials.files.filter(document => document.tags.every(tag => data.tags.includes(tag)) && data.metrics <= document.metrics)

                const files = matchedFiles.length >= data.minRequirement
                    ? matchedFiles.slice(0, data.minRequirement).map(file => ({
                        filePath: file.filePath,
                        fileName: file.fileName
                    }))
                    : Array(data.minRequirement).fill({ filePath: null, fileName: null });
        
                    acc.push({
                    requirementNumber: requirement.requirementNumber,
                    files,
                });

                return acc;
            }, []);
        };

        const updatedRequirements = selectedRank.requirements
            .map(getMatchedFiles)  // returns an array for each requirement
            .flat();  
    
        setUserRequirement(updatedRequirements);
    }, [selectedRank, credentials]); 

    const onSubmit = async (e) => {
        e.preventDefault();
        const name = user?.firstName + ' ' + user?.lastName;
        try {
            setIsSubmitted(true)
            await SubmitForm(name, user?.college, user?.department, user?.rank, user?.status, config.academicYear, selected, user?.track, userRequirement)
        } finally  {
            setIsSubmitted(false)
        }
    }

    return (
        <div>
            {confirm && (
                <>
                    <div className='modal'>
                        <div className="w-[30%] bg-white rounded-3xl shadow-lg px-8 py-8 fade-in max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%]">
                            <div className='space-y-2'>
                                <div className="relative">
                                    <button type="button" className="cursor-pointer absolute right-[-15px] top-[-25px] p-2 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c] text-2xl duration-200" onClick={() => setConfirm(false)}>
                                        <IoClose/>
                                    </button> 
                                </div>

                                <div className="flex justify-center">
                                    <div className='bg-[#e7edff] p-2.5 rounded-full'>
                                        <div className='bg-[#d7dcfe] p-2.5 rounded-full'>
                                            <div className='bg-NuBlue p-2.5 rounded-full'>
                                                <BsQuestionLg className='text-xl text-white'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <p className='text-3xl font-semibold tracking-tight text-center'>Are you sure?</p>
                                    <p className='m-5 text-sm text-center text-gray-600'>Are you sure about applying for {selected}? If you need any changes, you can always comeback.</p>
                                </div>

                                <div className="flex space-x-1.5">
                                    <button 
                                        type='button' 
                                        className='w-full py-2 text-sm duration-300 border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-300 hover:border-gray-300' 
                                        onClick={() => setConfirm(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button 
                                        type='button'
                                        className='w-full py-2 text-sm text-white duration-300 rounded-lg cursor-pointer border-NuBlue bg-NuBlue hover:bg-NuLightBlue' 
                                        onClick={onSubmit} 
                                        disabled={isSubmitted}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="relative w-full max-sm:text-sm">
                <div className="flex justify-between rounded-lg text-ellipsis overflow-hidden whitespace-nowrap border-2 border-[#93adc2] py-1 px-2 mt-3 max-sm:py-0.5 max-sm:px-0.5">
                    <button 
                        type='button' 
                        onClick={() => setIsOpen(!isOpen)} 
                        className='flex justify-between w-full px-4 py-2 cursor-pointer'
                    >
                        <span className='my-auto'>{selected}</span>
                        
                        {!isOpen ? (
                            <RiArrowDropDownLine size={'1.5rem'} className=''/>
                        ) : (
                            <RiArrowDropUpLine size={'1.5rem'} className=''/>
                        )}
                    </button>

                    <button 
                        type='button'
                        className='cursor-pointer text-white text-sm py-2.5 px-14 bg-NuBlue rounded-md shadow-md duration-300 hover:bg-NuLightBlue hover:scale-105' 
                        onClick={() => setConfirm(true)}
                    >
                        Apply
                    </button>
                </div>
                
                {isOpen && 
                    <div className="absolute flex flex-col mt-1 bg-white border rounded-md shadow-lg fade-in w-full border-[#93adc2] h-72 overflow-y-scroll ">
                        {availableRank?.map(i => (
                            <button 
                                key={i._id}
                                type='button' 
                                className='text-left hover:bg-NuLightBlue hover:text-white duration-200 py-1.5 px-4 cursor-pointer' 
                                onClick={() => {setSelected(i.rankName), setIsOpen(!isOpen)}}>{i.rankName}
                            </button>
                        ))}
                    </div>
                }
            </div>

            <div className=" p-4 mt-4 rounded-md border-2 border-[#93adc2] max-sm:text-sm">
                {selectedRank && 
                    selectedRank.requirements.map(requirement => {
                        const requirementDescription = String(requirement.description).split('\n');
                        const userSubmittedFile = userRequirement.find(req => req.requirementNumber === requirement.requirementNumber)
                        const submittedCount = userSubmittedFile?.files?.filter(file => file.filePath)?.length || null;

                        return (
                        <div key={requirement._id} className="mb-2 font-Poppins">
                            {requirementDescription.map((description, index) => (
                            <div key={index}>
                                <div className={`flex justify-between ${submittedCount && 'text-green-700'}`}>
                                {index === 0 ? (
                                    <>
                                        <p className='flex justify-between w-full'>
                                            <span>{`- ${description.trim()} `}</span>

                                            <span>
                                                {submittedCount && (
                                                    <FaCircleCheck className='my-auto text-green-600' />
                                                )}
                                            </span>
                                        </p>
                                        
                                        <ViewImage/>         
                                    </>
                                ) : (
                                    <p className='pl-4'>{description.trim()}</p>
                                )}
                                </div>
                            </div>
                            ))}
                        </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default Requirements
