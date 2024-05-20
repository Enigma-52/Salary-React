import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const fetchData = async () => {
    try {
      const response = await fetch('/salaries.csv');
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true }).data;
  
      // Filter out rows with NaN values in necessary fields
      const filteredData = parsedData.filter(row => {
        // Ensure that 'work_year' and 'salary_in_usd' fields are not NaN
        return !isNaN(row.work_year) && !isNaN(row.salary_in_usd);
      });
  
      return filteredData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  const YearlyAvgSalaryGraph = () => {
    const [yearlyAvgSalaryData, setYearlyAvgSalaryData] = useState([]);
  
    useEffect(() => {
      const fetchDataAndProcess = async () => {
        const fetchedData = await fetchData();
  
        // Process the fetched data to get yearly average salary
        const avgSalaryByYear = {};
        fetchedData.forEach(row => {
          const year = row.work_year;
          const salary = parseFloat(row.salary_in_usd);
  
          if (!isNaN(salary)) {
            if (!avgSalaryByYear[year]) {
              avgSalaryByYear[year] = [];
            }
            avgSalaryByYear[year].push(salary);
          }
        });
  
        // Calculate average salary for each year
        const yearlyAvgSalaryData = Object.keys(avgSalaryByYear).map(year => ({
          year: parseInt(year),
          avgSalary: (
            avgSalaryByYear[year].reduce((total, salary) => total + salary, 0) / avgSalaryByYear[year].length
          ).toFixed(2),
        }));

        console.log(yearlyAvgSalaryData);
  
        setYearlyAvgSalaryData(yearlyAvgSalaryData);
      };
  
      fetchDataAndProcess();
    }, []);
  
  return (
    <div>
      <h2>Yearly Average Salary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearlyAvgSalaryData}>
          <XAxis dataKey="year" />
          <YAxis domain={[0, 200000]} /> {/* Set the Y-axis domain with padding */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgSalary" name="Avg Salary per Year" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
  
  export default YearlyAvgSalaryGraph;
  