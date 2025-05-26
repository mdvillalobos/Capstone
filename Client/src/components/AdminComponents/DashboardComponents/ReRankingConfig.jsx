import { useContext, useState } from 'react'
import { RankContext } from '../../../../context/rankContext'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import useSaveConfiguration from '../../../hooks/AdminHooks/useSaveConfiguration';
import useToast from '../../../hooks/Helpers/useToast';
import MaleProfile from '../../../assets/images/male.png';
import FemaleProfile from '../../../assets/images/female.png';
import DraggableItem from '../../Tools/DraggableItem';
import useUpdateApprovers from '../../../hooks/AdminHooks/useUpdateApprovers';

const ReRankingConfig = ({ approverList }) => {
    const { config } = useContext(RankContext);
    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <div className='px-5 py-3 space-y-6 border-2 border-BorderColor rounded-xl text-TextPrimary'>
            {isOpen && (
                <ConfigModal
                    initialApprovers = {approverList}
                    handleExit = {() => setIsOpen(false)}
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
                onClick={() => setIsOpen(true)}
                className='w-full py-2 text-sm text-center rounded-md cursor-pointer bg-[#7C8AC4] text-white hover:bg-NuLightBlue hover:text-white duration-200'
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

    const [ approverList, setApproverList ] = useState(initialApprovers);

    const [ academicYear, setAcademicYear ] = useState(config ? config.academicYear : '')
    const [ reRankingStatus, setReRankingStatus ] = useState({
        isReRankingSet: config && config.reRankingStatus.isReRankingSet ? true : false, 
        isReRankingOpen: config && config.reRankingStatus.isReRankingOpen ? true : false,
        startDate: config ? new Date(config.reRankingPage.startDate).toISOString().split('T')[0] : '',
        endDate: config ? new Date(config.reRankingPage.endDate).toISOString().split('T')[0] : ''
    })

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
    
    const handleUpdateControls = async (e) => {
        e.preventDefault();

        if(reRankingStatus.isReRankingSet && (!reRankingStatus.startDate || !reRankingStatus.endDate) ) {
            return Toast.fire({
                icon: 'error',
                title: 'Required all fields'
            })
        }

        try {
            setIsSubmitted(true)
            await saveConfiguration(id, academicYear, reRankingPage)
        } finally {
            setIsSubmitted(false)
        }
    }

    const handleUpdateApproverList = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitted(true)
            await updateApprover(approverList)
        } catch (error) {
            setIsSubmitted(false)
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
                            onClick={() => setSelected('Signatories')}
                            className={`text-TextSecondary hover:bg-NuLightBlue cursor-pointer hover:text-white px-4 rounded-md py-2 text-left duration-200 ${selected === 'Signatories' && 'bg-NuBlue text-white pointer-events-none'}`}
                        >
                            Signatories
                        </button>
                        <button 
                            type='button' 
                            onClick={() => setSelected('Controls')}
                            className={`text-TextSecondary hover:bg-NuLightBlue cursor-pointer hover:text-white px-4 rounded-md py-2 text-left duration-200 ${selected === 'Controls' && 'bg-NuBlue text-white pointer-events-none'}`}
                        >
                            Controls
                        </button>
                    </div>

                    <div className='flex-1 px-3 py-2'>
                        {selected === 'Signatories' ? (
                            <div className='flex flex-col justify-between h-full'>
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

                                <div className='flex justify-end'>
                                    <button 
                                        type='button'
                                        disabled={isSubmitted}
                                        onClick={handleUpdateApproverList} 
                                        className='px-4 py-2 text-white border-2 rounded-md cursor-pointer bg-NuBlue'
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-between h-full'>
                                <div>
                                    <div className='flex justify-between'>
                                        <p>Academic Year:</p>
                                        <input type="text" 
                                            className='border-2'
                                            value={academicYear}
                                            onChange={(e) => setAcademicYear(e.target.value )} 
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <div className='flex justify-between'>
                                            <p>Re-Ranking Application</p>

                                            <label className="switch">
                                                <input 
                                                    type="checkbox" 
                                                    className="checkbox" 
                                                    checked={reRankingStatus.isReRankingSet} 
                                                    onChange={(e) => setReRankingStatus({ ...reRankingStatus, isReRankingSet: e.target.checked})} 
                                                />
                                                <div className="slider"></div>
                                            </label>
                                        </div>
                                        
                                        {reRankingStatus.isReRankingSet && (
                                            <div className='flex space-x-4 text-sm'>
                                                <div className='flex space-x-2'>
                                                    <p>Start Date:</p>
                                                    <input 
                                                        type="date"
                                                        className='text-xs border-2'
                                                        value={reRankingStatus.startDate}
                                                        onChange={(e) => setReRankingStatus({ ...reRankingStatus, startDate: e.target.value})}
                                                    />
                                                </div>
                                                
                                                <div className='flex space-x-2'>
                                                    <p>End Date:</p>
                                                    <input 
                                                        type="date" 
                                                        className='text-xs border-2'
                                                        value={reRankingStatus.endDate}
                                                        onChange={(e) => setReRankingStatus({ ...reRankingStatus, endDate: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className='flex justify-end'>
                                    <button 
                                        type='button' 
                                        onClick={handleUpdateControls} 
                                        className='px-4 py-2 text-white border-2 rounded-md cursor-pointer bg-NuBlue' 
                                        disabled={isSubmitted}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
