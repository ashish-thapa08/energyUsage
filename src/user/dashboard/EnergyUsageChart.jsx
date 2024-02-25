import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const EnergyUsageChart = ({ deviceData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Process the data to group energy usage by week and month for each device
    const groupedData = groupDataByDevice(deviceData);

    // Create labels and datasets for the chart
    const labels = Object.keys(groupedData);
    const datasets = [];

    // Create datasets for weekly and monthly energy usage for each device
    for (const deviceName in groupedData) {
      const weeklyEnergyUsages = [];
      const monthlyEnergyUsages = [];

      const energyUsageByWeek = groupByWeek(groupedData[deviceName]);
      const energyUsageByMonth = groupByMonth(groupedData[deviceName]);

      for (const week in energyUsageByWeek) {
        weeklyEnergyUsages.push(energyUsageByWeek[week]);
      }

      for (const month in energyUsageByMonth) {
        monthlyEnergyUsages.push(energyUsageByMonth[month]);
      }

      datasets.push({
        label: `${deviceName} Weekly Energy Usage`,
        data: weeklyEnergyUsages,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      });

      datasets.push({
        label: `${deviceName} Monthly Energy Usage`,
        data: monthlyEnergyUsages,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      });
    }

    // Chart creation using Chart.js
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [deviceData]);

  // Function to group energy usage by week
  const groupByWeek = data => {
    return data.reduce((acc, record) => {
      const date = new Date(record.timestamp);
      const weekNumber = getWeekNumber(date);

      if (!acc[weekNumber]) {
        acc[weekNumber] = 0;
      }

      acc[weekNumber] += record.energyUsage;
      return acc;
    }, {});
  };

  // Function to get the week number from a date
  const getWeekNumber = date => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return weekNumber;
  };

  // Function to group energy usage by month
  const groupByMonth = data => {
    return data.reduce((acc, record) => {
      const date = new Date(record.timestamp);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }

      acc[monthYear] += record.energyUsage;
      return acc;
    }, {});
  };

  // Function to group data by device
  const groupDataByDevice = data => {
    return data.reduce((acc, record) => {
      if (!acc[record.name]) {
        acc[record.name] = [];
      }

      acc[record.name].push(record);
      return acc;
    }, {});
  };

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default EnergyUsageChart;
