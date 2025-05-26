import { useContext, useState } from 'react'
import { RankContext } from '../../../../context/rankContext'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import useSaveConfiguration from '../../../hooks/AdminHooks/useSaveConfiguration';
import useToast from '../../../hooks/Helpers/useToast';
import MaleProfile from '../../../assets/images/male.png';
import FemaleProfile from '../../../assets/images/female.png';
import DraggableItem from '../../Tools/DraggableItem';
import useUpdateApprovers from '../../../hooks/AdminHooks/useUpdateApprovers';
import VerifyAdminModal from '../../Tools/VerifyAdminModal';

const ReRankingConfig = ({ approverList }) => {
    const { config } = useContext(RankContext);
    const [ isVerifyAdminOpen, setIsVerifyAdminOpen ] = useState(false);
    const [ isConfigModalOpen, setIsConfigModalOpen ] = useState(false)
    
    return (
        <div className='px-5 py-3 space-y-6 border-2 border-BorderColor rounded-xl text-TextPrimary'>
            {isVerifyAdminOpen && (
                <VerifyAdminModal
                    setOpenModal = {setIsConfigModalOpen}
                    handleExit = {() => setIsVerifyAdminOpen(false)}
                />
            )}
            {isConfigModalOpen && (
                <ConfigModal
                    initialApprovers = {approverList}
                    handleExit = {() => { setIsConfigModalOpen(false), setIsVerifyAdminOpen(false)}}
                />
            )}
             <div className='min-h-60'>
                <p className="mb-3 text-lg font-medium">Signatories</p>
                <div className='space-y-3'>      
                    {approverList ? (
                        approverList.map((approver, index) => (
                            <div key={index} className="text-xs">
                                <div className='flex space-x-2'>
                                    {approver.accountinfo[0].profilePicture ? (
                                        <>
                                        </>
                                    ) : (
                                        approver.accountinfo[0]?.sex === 'Male' ? (
                                            <img src={MaleProfile} alt="" className='my-auto rounded-md w-9 h-9'/>
                                        ) : (
                                            <img src={FemaleProfile} alt="" className='my-auto rounded-md h-9 w-9'/>
                                        )
                                    )}
                                    <div className='my-auto space-y-0.5'>
                                        <p>{approver.accountinfo[0]?.firstName} {approver.accountinfo[0]?.lastName}</p>
                                        <p className='text-TextSecondary'>{approver.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : null}
                </div>
            </div>
            
            <div>
                <p className="mb-4 text-lg font-medium">Controls</p>

                <div className='space-y-3'>
                    <div className='flex justify-between text-sm'>
                        <p>Academic year</p>
                        <p>{config ? config?.academicYear : 'none'}</p>
                    </div>

                    <div className='flex justify-between text-sm'>
                        <p>Re-ranking status</p>
                    </div>
                </div>
            </div>

            <button 
                type='button'
                onClick={() => setIsVerifyAdminOpen(true)}
                className='w-full py-2 text-sm text-center text-white duration-200 rounded-md cursor-pointer bg-NuBlue hover:bg-NuLightBlue hover:text-white'
            >
                Configure
            
            </button>
        </div>
    )
}

export default ReRankingConfig

const ConfigModal = ({ initialApprovers, handleExit }) => {
    const { config } = useContext(RankContext);
    const { saveConfiguration } = useSaveConfiguration();
    const { updateApprover } = useUpdateApprovers();
    const { Toast } = useToast();

    const id = config ? config._id : null
    const sensors = useSensors(useSensor(PointerSensor));

    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ selected, setSelected ] = useState('Signatories');
    const [ isEditOn, setIsEditOn ] = useState(false);

    const [ approverList, setApproverList ] = useState(initialApprovers); //signatory section

    //control section
    const [ academicYear, setAcademicYear ] = useState(config ? config.academicYear : '')
    const [ reRankingStatus, setReRankingStatus ] = useState({
        isReRankingSet: config?.reRankingStatus?.isReRankingSet ?? false,
        startDate: config?.reRankingStatus?.startDate ? new Date(config.reRankingStatus.startDate).toISOString().split('T')[0] : '',
        endDate: config?.reRankingStatus?.endDate ? new Date(config.reRankingStatus.endDate).toISOString().split('T')[0] : ''
    })

    //signatory section
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = active.id;
        const newIndex = over.id;

        setApproverList((items) => arrayMove(items, oldIndex, newIndex));
    };

    const handleRemoveApprover = (email) => {
        setApproverList(prev => prev.filter(acc => acc.email !== email ))
    }

    const handleUpdateApproverList = async () => {
        try {
            setIsSubmitted(true)
            await updateApprover(approverList)
        } finally {
            setIsSubmitted(false)
            setIsEditOn(false)
        }
    }
    
    //control section
    const handleUpdateControls = async () => {
        const { isReRankingSet, startDate, endDate } = reRankingStatus;
        const { isReRankingSet: configIsReRankingSet = false, startDate: configStartDate = '', endDate: configEndDate = '' } = config.reRankingStatus ?? {};
        const formatDate = (dateStr) => dateStr ? new Date(dateStr).toISOString().split('T')[0] : '';

        const configAcademicYear = config?.academicYear ?? '';

        if(isReRankingSet && (!startDate|| !endDate)) {
            return Toast.fire({
                icon: 'error',
                title: 'Required all fields'
            })
        }
        
        const hasChanges = 
            isReRankingSet !== configIsReRankingSet ||
            startDate !== formatDate(configStartDate) ||
            endDate !== formatDate(configEndDate) ||
            academicYear !== configAcademicYear;

        console.log('hasChanges:', hasChanges)

        if(!hasChanges) {     
            console.log('tae')       
            setIsSubmitted(false)
            console.log(isSubmitted)
            setIsEditOn(false)
            return;
        }

        try {
            setIsSubmitted(true)
            await saveConfiguration(id, academicYear, reRankingStatus);

        } finally {
            setIsSubmitted(false)
            setIsEditOn(false)
        }
    }

    return (
        <div className='modal'>
            <div className='flex flex-col w-[50%] h-[65vh] bg-white shadow-md rounded-xl fade-in'>
                <div className='relative flex justify-between px-6 py-4 border-b border-BorderColor'>
                    <div className='flex space-x-2'>
                        <div className='space-y-0.5'>
                            <p className='text-sm font-medium'>Configuration</p>
                            <p className='text-xs text-TextSecondary'>Adjust the setting for re-ranking applications.</p>
                        </div>
                    </div>
                    <button type="button" className="absolute right-4 px-2 top-5 rounded-full hover:bg-[#eae7e7] text-lg duration-200 border-2 border-gray-200 cursor-pointer" onClick={handleExit}>
                        &times;
                    </button> 
                </div>

                <div className='flex h-full'>
                    <div className='flex flex-col w-48 px-3 py-2 space-y-1 text-sm border-r border-BorderColor'>
                        <button 
                            type='button' 
                            onClick={() => { setSelected('Signatories'), setIsEditOn(false) }}
                            className={`text-TextSecondary hover:bg-NuLightBlue cursor-pointer hover:text-white px-4 rounded-md py-2 text-left duration-200 ${selected === 'Signatories' && 'bg-NuBlue text-white pointer-events-none'}`}
                        >
                            Signatories
                        </button>
                        <button 
                            type='button' 
                            onClick={() => { setSelected('Controls'), setIsEditOn(false) }}
                            className={`text-TextSecondary hover:bg-NuLightBlue cursor-pointer hover:text-white px-4 rounded-md py-2 text-left duration-200 ${selected === 'Controls' && 'bg-NuBlue text-white pointer-events-none'}`}
                        >
                            Controls
                        </button>
                    </div>

                    <f className='flex flex-col justify-between flex-1 px-4 pb-4'>
                        {selected === 'Signatories' ? (
                            <div className={`${!isEditOn ? 'pointer-events-none' : ''}`}>
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext
                                        items={approverList.map((_, index) => index)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div>
                                            {approverList.length > 0 ? (
                                                approverList.map((approver, index) => (
                                                <DraggableItem
                                                    key={index} 
                                                    index={index} 
                                                    approver={approver} 
                                                    handleRemoveApprover={handleRemoveApprover} 
                                                />
                                                ))
                                            ) : (
                                                <p>No Current Approvers</p>
                                            )}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            </div>
                        ) : (
                            <div>
                                <div className='flex justify-between py-4 border-b-2 border-BorderColor'>
                                    <div>
                                        <p className='my-auto text-sm'>Academic year:</p>
                                        <p className='text-xs text-TextSecondary'>Select the relevant academic year for this data.</p>
                                    </div>
                                    <input type="text" 
                                        className='border-2 border-BorderColor px-4 py-1.5 outline-0 focus:border-[#93adc2] rounded-lg text-xs'
                                        value={academicYear}
                                        onChange={(e) => setAcademicYear(e.target.value)} 
                                        disabled={!isEditOn}
                                    />
                                </div>

                                <div className='py-4 space-y-6 border-b-2 border-BorderColor'>
                                    <div className='flex justify-between'>
                                        <div className='my-auto'>
                                            <p className='my-auto text-sm'>Re-ranking application</p>
                                            <p className='text-xs text-TextSecondary'>Configure the re-ranking application window.</p>
                                        </div>
                                        
                                        <label className="my-auto switch">
                                            <input 
                                                type="checkbox"
                                                className='checkbox' 
                                                checked={reRankingStatus.isReRankingSet} 
                                                onChange={(e) => setReRankingStatus({ ...reRankingStatus, isReRankingSet: e.target.checked})} 
                                                disabled={!isEditOn}
                                            />
                                            <div className="slider"></div>
                                        </label>
                                    </div>

                                    {reRankingStatus.isReRankingSet && (
                                        <div className='flex space-x-4 text-sm'>
                                            <div className='flex flex-col space-y-1'>
                                                <p>Start Date:</p>
                                                <input 
                                                    type="date"
                                                    className='px-2 py-2 text-xs border-2 rounded-md outline-none border-BorderColor focus:border-[#93adc2]'
                                                    value={reRankingStatus.startDate}
                                                    onChange={(e) => setReRankingStatus({ ...reRankingStatus, startDate: e.target.value})}
                                                />
                                            </div>
                                            
                                            <p className='relative font-bold -bottom-8'>-</p>
                                            
                                            <div className='flex flex-col space-y-1'>
                                                <p>End Date:</p>
                                                <input 
                                                    type="date" 
                                                    className='px-2 py-2 text-xs border-2 rounded-md outline-none border-BorderColor focus:border-[#93adc2]'
                                                    value={reRankingStatus.endDate}
                                                    onChange={(e) => setReRankingStatus({ ...reRankingStatus, endDate: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className='flex justify-end'>
                            {isEditOn ? (
                                <div className='space-x-2'>
                                    <button 
                                        type='button' 
                                        onClick={() => setIsEditOn(false)} 
                                        className='w-32 px-10 py-2 text-sm text-black duration-200 bg-gray-300 rounded-lg cursor-pointer hover:shadow-md' 
                                        disabled={isSubmitted}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type='button' 
                                        onClick={selected === 'Signatories' ? handleUpdateApproverList : handleUpdateControls}
                                        className='w-32 px-10 py-2 text-sm text-white duration-200 rounded-lg cursor-pointer hover:shadow-md bg-NuBlue' 
                                        disabled={isSubmitted}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    type='button' 
                                    onClick={() => setIsEditOn(true)} 
                                    className='w-32 px-10 py-2 text-sm text-white duration-200 rounded-lg cursor-pointer hover:shadow-md bg-NuBlue' 
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </f>
                </div>
            </div>
        </div>
    )
}
