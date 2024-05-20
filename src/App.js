// src/App.js
import React from 'react';
import MainTable from './MainTable';
import { Layout } from 'antd';
import './App.css';
import YearlyJobGraph from './YearlyJobGraph';
import YearlyAvgSalaryGraph from './YearlyAvgSalaryGraph'

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ color: 'white', textAlign: 'center' }}>
        Job Summary
      </Header>
      <Content style={{ padding: '50px' }}>
        <MainTable />
        <YearlyJobGraph />
        <YearlyAvgSalaryGraph />
      </Content>
    </Layout>
  );
}

export default App;
