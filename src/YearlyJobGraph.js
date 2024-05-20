import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import LineGraph from './LineGraph';

const fetchData = async () => {
  try {
    const response = await fetch('/salaries.csv');
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, { header: true }).data;
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

const YearlyJobGraph = () => {
  const [yearlyJobData, setYearlyJobData] = useState([]);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      const fetchedData = await fetchData();

      // Process the fetched data to get year-wise job count
      const yearCounts = {};
      fetchedData.forEach(row => {
        const year = row.work_year;
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      });

      // Convert the object to an array of objects for Recharts compatibility
      const jobDataArray = Object.keys(yearCounts).map(year => ({
        year: parseInt(year),
        numJobs: yearCounts[year]
      }));

      setYearlyJobData(jobDataArray);
    };

    fetchDataAndProcess();
  }, []);

  return (
    <div>
      <h2>Yearly Job Count</h2>
      <LineGraph data={yearlyJobData} />
    </div>
  );
};

export default YearlyJobGraph;
