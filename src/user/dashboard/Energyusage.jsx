import React from 'react';
import EnergyUsageChart from './EnergyUsageChart';

const Energyusage = () => {
  const energyUsageData = [
    {
      name: 'Device A',
      energyUsage: 150,
      cost: 30,
      timestamp: '2024-01-01T12:00:00'
    },
    {
        name: 'Device A',
        energyUsage: 150,
        cost: 30,
        timestamp: '2024-01-05T12:00:00'
      },
      {
        name: 'Device A',
        energyUsage: 150,
        cost: 30,
        timestamp: '2024-01-02T12:00:00'
      },
      {
        name: 'Device A',
        energyUsage: 150,
        cost: 30,
        timestamp: '2024-01-03T12:00:00'
      },
      {
        name: 'Device A',
        energyUsage: 150,
        cost: 30,
        timestamp: '2024-01-04T12:00:00'
      },
      {
        name: 'Device A',
        energyUsage: 150,
        cost: 30,
        timestamp: '2024-01-06T12:00:00'
      },
      {
        name: 'Device A',
        energyUsage: 150,
        cost: 30,
        timestamp: '2024-01-07T12:00:00'
      },
      {
        name: 'Device A',
        energyUsage: 150,
        cost: 30,
        timestamp: '2024-01-08T12:00:00'
      },
    {
      name: 'Device B',
      energyUsage: 200,
      cost: 40,
      timestamp: '2024-01-02T12:00:00'
    },{
        name: 'Device B',
        energyUsage: 100,
        cost: 40,
        timestamp: '2024-01-03T12:00:00'
      },
    {
      name: 'Device C',
      energyUsage: 100,
      cost: 20,
      timestamp: '2024-01-03T12:00:00'
    }
  ];

  return (
    <div>
      <h1>Energy Usage Records</h1>
      <EnergyUsageChart deviceData={energyUsageData} />
    </div>
  );
};

export default Energyusage;
