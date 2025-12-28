import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

const CustomBarChart = ({data, colorScheme = "alternating"}) => {

    //Function to get bar colors
    const getBarColor = (index) => {
        if (colorScheme === "purple") {
            return "#875cf5"; // All purple
        }
        // Alternating colors (default)
        return index%2===0 ? "#875cf5" : "#cfbefb";
    };

    const CustomTooltip = ( { active, payload }) => {
        if( active && payload && payload.length) {
            const data = payload[0].payload;
            const label = data.category || data.source || "Transaction";
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>{label}</p>
                    <p className='text-sm text-gray-600'>
                        Amount: <span className='text-sm font-medium text-gray-900'>${data.amount}</span>
                    </p>
                </div>
            )
        }
        return null;
    };

  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke="none"/>

                <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill:"#555"}} 
                    stroke="#e5e7eb"
                    axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis 
                    tick={{ fontSize: 12, fill: "#555"}} 
                    stroke="#e5e7eb"
                    axisLine={{ stroke: "#e5e7eb" }}
                />

                <Tooltip content={CustomTooltip}/>

                <Bar 
                    dataKey="amount"
                    radius={[10,10,0,0]}
                    activeDot={{ r:8, fill: colorScheme === "purple" ? "#875cf5" : "#875cf5"}}
                    activeStyle={{ fill: colorScheme === "purple" ? "#6d28d9" : "#875cf5"}}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={getBarColor(index)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart