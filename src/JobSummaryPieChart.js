import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const JobSummaryPieChart = ({ data }) => {
  // Sort data by numJobs in descending order and select top 20 entries
  const sortedData = data.sort((a, b) => b.numJobs - a.numJobs).slice(0, 7);

  // Define custom color scheme for the pie chart
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#FF5733', '#C70039', '#900C3F'];

  // Convert top 20 data entries to the format expected by Recharts PieChart
  const chartData = sortedData.map((entry, index) => ({
    name: entry.jobTitle,
    value: entry.numJobs,
    fill: colors[index % colors.length], // Assign color from color scheme based on index
  }));

  return (
    <div>
      <h2 style={{ padding: '50px' }} >  Job Summary Pie Chart( Top 7 )</h2>
      <ResponsiveContainer width={400} height={400} >
        <PieChart>
          <Pie dataKey="value" data={chartData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobSummaryPieChart;
