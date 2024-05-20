// src/MainTable.js
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Papa from 'papaparse';
import JobSummaryTable from './JobSummaryTable';
import JobSummaryPieChart from './JobSummaryPieChart'; 

const columns = [
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
    sorter: (a, b) => a.year - b.year,
  },
  {
    title: 'Number of Total Jobs',
    dataIndex: 'totalJobs',
    key: 'totalJobs',
    sorter: (a, b) => a.totalJobs - b.totalJobs,
  },
  {
    title: 'Average Salary (USD)',
    dataIndex: 'avgSalary',
    key: 'avgSalary',
    sorter: (a, b) => a.avgSalary - b.avgSalary,
  },
];

const MainTable = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [jobSummaryData, setJobSummaryData] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV file
    fetch('/salaries.csv')
      .then(response => response.text())
      .then(csvText => {
        const parsedData = Papa.parse(csvText, { header: true }).data;
        const filteredData = parsedData.filter(row => {
            // Ensure that 'work_year' and 'salary_in_usd' fields are not NaN
            return !isNaN(row.work_year) && !isNaN(row.salary_in_usd);
          });
        const summary = {};

        // Process the parsed data
        filteredData.forEach(item => {
          const year = parseInt(item.work_year, 10);
          const salary = parseFloat(item.salary_in_usd);

          if (!summary[year]) {
            summary[year] = { totalJobs: 0, totalSalary: 0 };
          }

          summary[year].totalJobs += 1;
          summary[year].totalSalary += salary;
        });

        const tableData = Object.keys(summary).map(year => ({
          year: parseInt(year, 10),
          totalJobs: summary[year].totalJobs,
          avgSalary: (summary[year].totalSalary / summary[year].totalJobs).toFixed(2),
        }));

        setData(tableData);
      });
  }, []);

  useEffect(() => {
    if (selectedYear !== null) {
      // Fetch data for the selected year
      const fetchDataForYear = async () => {
        try {
          const response = await fetch('/salaries.csv');
          const csvText = await response.text();
          const parsedData = Papa.parse(csvText, { header: true }).data;
  
          // Filter data for the selected year
          const filteredData = parsedData.filter(item => parseInt(item.work_year, 10) === selectedYear);
          const summary = {};

          console.log(filteredData);
  
          // Calculate job summary for the selected year
          filteredData.forEach(item => {
            const jobTitle = item.job_title;
            summary[jobTitle] = (summary[jobTitle] || 0) + 1;
          });

          console.log(filteredData);
  
          // Convert summary object to an array of objects
          const jobSummaryData = Object.keys(summary).map(jobTitle => ({
            year : selectedYear,
            jobTitle: jobTitle,
            numJobs: summary[jobTitle],
          }));
  
          console.log(jobSummaryData);
          // Set the job summary data for the selected year
          setJobSummaryData(jobSummaryData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchDataForYear();
    }
  }, [selectedYear]);
  
  const handleRowClick = (record) => {
    console.log(record.year);
    setSelectedYear(record.year);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="year" onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })} />

      <div>
      {selectedYear && (
          <h2>Job Title Stats for {selectedYear}</h2>
        )}
      </div>
      
      <div>
        {selectedYear && (
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
            
            <JobSummaryTable data={jobSummaryData} />
            {<JobSummaryPieChart data={jobSummaryData} />}
          </div>
        )}
      </div>

    </div>
  );
};

export default MainTable;
