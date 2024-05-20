import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} >
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="numJobs" name="Number of Jobs" stroke="#8884d8" />
        {/* Add more lines for additional data if needed */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
