import { useState } from 'react';
import inrIcon from '../../assets/inr.svg';

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('Dec');

  // Sample sales data - flat line at 0 as shown in screenshot
  const salesData = Array.from({ length: 12 }, () => 0);

  const metrics = [
    {
      label: 'Total Order',
      value: '11',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Pending Order',
      value: '0',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Total Courses',
      value: '70',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v9M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      label: 'Pending Courses',
      value: '0',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v9M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      label: 'Total Earnings',
      value: '₹372.60',
      icon: (
        <img src={inrIcon} alt="INR" className="w-8 h-8" />
      ),
    },
    {
      label: 'This Years Earnings',
      value: ' ₹0.00',
      icon: (
        <img src={inrIcon} alt="INR" className="w-8 h-8" />
      ),
    },
    {
      label: 'This Month Earnings',
      value: '₹0.00',
      icon: (
        <img src={inrIcon} alt="INR" className="w-8 h-8" />
      ),
    },
    {
      label: 'Todays Earnings',
      value: '₹0.00',
      icon: (
        <img src={inrIcon} alt="INR" className="w-8 h-8" />
      ),
    },
  ];

  const chartWidth = 800;
  const chartHeight = 300;
  const padding = 40;
  const graphWidth = chartWidth - padding * 2;
  const graphHeight = chartHeight - padding * 2;
  const maxValue = 1.0;
  const stepCount = 5;

  // Generate points for the line
  const points = salesData.map((value, index) => {
    const x = padding + (index / (salesData.length - 1)) * graphWidth;
    const y = padding + graphHeight - (value / maxValue) * graphHeight;
    return { x, y };
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className=' mt-6'>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4"
          >
            <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
              {metric.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">
                {metric.label.toLowerCase().includes('earnings') ? (
                  <span className="inline-flex items-center gap-1">
                    <img src={inrIcon} alt="INR" className="w-5 h-5" />
                    <span>{metric.value.replace('₹', '').trim()}</span>
                  </span>
                ) : (
                  metric.value
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
            Sales In December, 2025
          </h2>
          <div className="flex space-x-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="Jan">Jan</option>
              <option value="Feb">Feb</option>
              <option value="Mar">Mar</option>
              <option value="Apr">Apr</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="Jul">Jul</option>
              <option value="Aug">Aug</option>
              <option value="Sep">Sep</option>
              <option value="Oct">Oct</option>
              <option value="Nov">Nov</option>
              <option value="Dec">Dec</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="overflow-x-auto">
          <svg
            width={chartWidth}
            height={chartHeight}
            className="w-full h-auto"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {/* Y-axis labels */}
            {Array.from({ length: stepCount + 1 }).map((_, i) => {
              const value = (maxValue / stepCount) * (stepCount - i);
              const y = padding + (i / stepCount) * graphHeight;
              return (
                <g key={i}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={chartWidth - padding}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="text-xs fill-gray-500"
                  >
                    {value.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {/* X-axis */}
            <line
              x1={padding}
              y1={chartHeight - padding}
              x2={chartWidth - padding}
              y2={chartHeight - padding}
              stroke="#e5e7eb"
              strokeWidth={2}
            />

            {/* Y-axis */}
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={chartHeight - padding}
              stroke="#e5e7eb"
              strokeWidth={2}
            />

            {/* Sales line */}
            <path
              d={pathData}
              fill="none"
              stroke="#394EEA"
              strokeWidth={2}
            />

            {/* Data points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={4}
                fill="#394EEA"
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-primary"></div>
            <span className="text-sm text-gray-600">Sales</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

