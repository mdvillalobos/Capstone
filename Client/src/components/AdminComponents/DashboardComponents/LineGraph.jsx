import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const LineGraph = ({ totalApplicationPerYear }) => {
    const lineData = Object.entries(totalApplicationPerYear)?.map(([year, count]) => {
        const shortLabel = year
            .split('-')
            .map(y => y.slice(2))
            .join('-');
        return {
            TotalNumber: count,
            label: shortLabel
        }
    })

    const reversedLineData = lineData.reverse();
    const maxDataValue = Math.max(...reversedLineData.map(item => item.TotalNumber), 0);
    const yAxisDomain = [0, maxDataValue + 3];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'white',
                    border: '1px solid #eee',
                    padding: '5px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <strong>{payload[0].value.toLocaleString()}</strong>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="text-[0.7rem] border-2 border-BorderColor rounded-xl pl-6 pr-2 pt-4 space-y-7 text-TextPrimary">
            <div className="">
                <p className='text-lg font-medium'>Total Application</p>
                <p className='text-xs text-gray-500'>Total for the last five years</p>
            </div>

            <div className='w-full mt-4'>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={reversedLineData}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#4b5a9b" stopOpacity={0.2} />
                                <stop offset="50%" stopColor="#4b5a9b" stopOpacity={0.1} />
                                <stop offset="100%" stopColor="#4b5a9b" stopOpacity={0.01} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#f3e8ff" vertical={false} strokeDasharray="3 3"/> 
                        <XAxis 
                            dataKey="label" 
                            tickLine={false}
                            axisLine={false}
                            padding={{ left: 10, right: 30 }}
                            tick={{ fontSize: 10, fill: '#6B7280' }}
                        />
                       <YAxis 
                            tickMargin={0} 
                            tickLine={false}
                            axisLine={false}
                            padding={{ top: 0, bottom: 0 }}
                            width={10}
                            domain={yAxisDomain}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        {/* <Area type="monotone" dataKey="TotalNumber" stroke="#5e76a2" fill="url(#colorTotal)"  /> */}
                        <Area
                            type="monotone"
                            dataKey="TotalNumber"
                            stroke="#4b5a9b"
                            strokeWidth={1}
                            fillOpacity={1}
                            fill="url(#colorTotal)"
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default LineGraph
