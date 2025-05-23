import { useContext, useState } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

 const collegeList = {
    CAH: 'College of Allied Health',
    COA: 'College of Architecture',
    CBA: 'College of Business and Accountancy',
    CCIT: 'College of Computing and Information Technologies',
    CEAS: 'College of Education Arts and Sciences',
    COE: 'College of Engineering',
    CTHM: 'College of Tourism and Hospitality Management'
}

const BarGraph = ({ rankPerCollege  }) => {
    const { ranks } = useContext(RankContext);
    const [ selected, setSelected ] = useState('Instructor 1');
    const [ isOpen, setIsOpen ] = useState(false);

    const toDisplayData = rankPerCollege?.find(rank => rank.rankName === selected);

    const chartData =  Object.entries(collegeList).map(([ acronym, collegeName ]) => {
        const count = toDisplayData?.rankCounts[collegeName] || 0; 
        return {
            TotalNumber: count,
            label: acronym 
        };
    });

    const maxDataValue = Math.max(...chartData.map(item => item.TotalNumber), 0);
    const yAxisDomain = [0, maxDataValue + 4];

    return (
        <div className='border-2 border-gray-200 rounded-2xl px-6 py-3 space-y-4 w-[75%]'>
            <div className="flex justify-between">
                <div className="">
                    <p className='text-lg font-medium'>Rank Summary</p>
                    <p className='text-xs text-gray-500'>Total rank per department</p>
                </div>

                <div className="flex space-x-2">
                    <div className="my-auto w-44">
                        <button className="flex justify-between py-1.5 w-full rounded-xl text-sm border border-gray-200 pl-4 pr-1 py-1 bg-[#f9f9f9] text-NuLightText" onClick={() => setIsOpen(!isOpen)}>
                            <span className="overflow-hidden text-left whitespace-nowrap text-ellipsis">{selected}</span>

                            {!isOpen ? (
                              <MdOutlineKeyboardArrowDown size={'1.1rem'} className='my-auto text-gray-500'/>
                            ) : (
                              <MdOutlineKeyboardArrowUp size={'1.1rem'} className='my-auto text-gray-500'/>
                            )}
                        </button>

                        {isOpen && (
                            <div className="absolute z-10 mt-1 overflow-y-scroll text-xs bg-white border border-gray-300 rounded-lg shadow-lg w-44 h-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                {ranks?.map((rank) => (
                                    <div
                                        key={rank._id}
                                        onClick={() => {setSelected(rank.rankName), setIsOpen(!isOpen)}}
                                        className={`cursor-pointer py-2 px-3 hover:bg-NuLightBlue hover:text-white duration-200 ${selected === rank.rankName && 'bg-NuBlue text-white'}`}
                                    >
                                        {rank.rankName}
                                    </div>
                                ))}
                             </div>
                        )}
                    </div>
                </div>
            </div>

            {/* <div className='flex flex-col mt-2'>
                <p className='text-4xl text-left'>{totalFaculty}</p>
                <p className='text-xs font-medium text-NuLightText'>Overall Faculty</p>
            </div> */}

  
            <div className="text-[0.7rem] font-semibold text-NuLightText w-[100%]">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        data={chartData.length > 0 ? chartData : [{ label: "", TotalNumber: 0 }]}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#8A8A8A",    
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                        />
                        <YAxis
                            tick={false}
                            tickLine={false}
                            axisLine={true}
                            domain={yAxisDomain}
                            width={0}
                        />
                        <Tooltip />
                        <Bar
                            dataKey="TotalNumber"
                            fill="#4b5a9b"
                            radius={[5, 5, 5, 5]}
                            barSize={60}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}

export default BarGraph
