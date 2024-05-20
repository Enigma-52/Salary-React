import React from 'react';
import { Table } from 'antd';

const JobSummaryTable = ({ data }) => {
  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'numJobs',
      key: 'numJobs',
      sorter: (a, b) => a.numJobs - b.numJobs,
    },
  ];

  return (
    <Table columns={columns} dataSource={data} rowKey="jobTitle" style={{ width: '100%' }} />
  );
};

export default JobSummaryTable;
