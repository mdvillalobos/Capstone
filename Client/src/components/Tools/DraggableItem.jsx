import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragHandle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const DraggableItem = ({ index, approver, handleRemoveApprover, isEditOn }) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
    } = useSortable({ id: index }); // use index as id

    const style = {
        transform: CSS.Transform.toString(transform),
        padding: '8px',
        margin: '4px 0',
        backgroundColor: 'white',
        cursor: 'grab'
    };
    
    return (
        <div  className='relative flex border-2 rounded-md border-BorderColor' ref={setNodeRef} style={style}>
            <div className='flex w-full space-x-2' >
                <div {...attributes} {...listeners} className='my-auto'>
                    <MdDragHandle className='my-auto text-lg text-NuLightText'/>
                </div>
                <p className='text-sm'>{approver.accountinfo?.[0].firstName} {approver.accountinfo?.[0].lastName}</p>
            </div>
            {isEditOn && (
                <button 
                    type='button'
                    className='absolute z-10 p-1 text-xs text-white bg-red-400 rounded-full cursor-pointer right-2 top-2' 
                    onClick={() => handleRemoveApprover(approver)}
                >
                    <p className='my-auto'><RxCross2/></p>
                </button>
            )}
        </div>
    );
}

export default DraggableItem