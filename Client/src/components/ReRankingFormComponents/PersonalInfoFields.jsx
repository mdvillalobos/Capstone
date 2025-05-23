const ApplicationMasterPage = ({ name, college, department, currentRank, status, academicYear }) => {
    return (
        <div className="">
            <div className='py-3 space-y-6 border-t-2 border-b-2 border-NuBlue'>
                <h1 className='text-base font-semibold text-NuBlue'>Personal Information</h1>

                <div className='flex justify-between max-md:flex-col max-md:space-y-2'>
                    <div className='flex flex-col justify-between space-y-4 max-md:space-y-2'>
                        <div className="inputContainer">
                            <label htmlFor="Name" className='inputLabel'>Name:</label>
                            <input type="text" id="Name" className='inputFields' defaultValue={ name } disabled/>
                        </div>

                        <div className="inputContainer">
                            <label htmlFor="college" className='inputLabel'>College:</label>
                            <input type="text" id="college" className='inputFields ' defaultValue={ college } disabled/>
                        </div>

                        <div className="inputContainer">
                            <label htmlFor="department" className='inputLabel'>Department:</label>
                            <input type="text" id="department" className='inputFields' defaultValue={ department } disabled/>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between space-y-4 max-md:space-y-2'>
                        <div className="inputContainer">
                            <label htmlFor="rank" className='inputLabel'>Current Rank:</label>
                            <input type="text" id="rank" className='inputFields' defaultValue={ currentRank } disabled/>
                        </div>

                        <div className="inputContainer">
                            <label htmlFor="status" className='inputLabel'>Status:</label>
                            <input type="text" id="status" className='inputFields' defaultValue={ status } disabled/>
                        </div>

                        <div className="inputContainer">
                            <label htmlFor="term" className='inputLabel'>AY/Term:</label>
                            <input type="text" id="term" className='inputFields' defaultValue={ academicYear } disabled/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationMasterPage