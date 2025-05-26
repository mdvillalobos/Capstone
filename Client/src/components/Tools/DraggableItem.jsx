import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDragHandle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const DraggableItem = ({ index, approver, handleRemoveApprover }) => {
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
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'white',
        cursor: 'grab'
    };
    
    return (
        <div  className='relative flex rounded-md' ref={setNodeRef} style={style}>
            <div className='flex w-full space-x-2' >
                <div {...attributes} {...listeners} className='my-auto'>
                    <MdDragHandle className='my-auto text-lg text-NuLightText'/>
                </div>
                <p>{approver.accountinfo?.[0].firstName} {approver.accountinfo?.[0].lastName}</p>
            </div>
            <button className='absolute p-1 text-xs text-white bg-red-400 rounded-full right-2 top-2.5 cursor-pointer z-10' onClick={() => handleRemoveApprover(approver.email)}>
                <p className='my-auto'> <RxCross2/></p>
            </button>
        </div>
    );
}

export default DraggableItem