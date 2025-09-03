import React from 'react';

const StatsCard = ({ title, value, icon: Icon, change }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="glass-effect rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-sm">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
        <span className="text-muted text-sm ml-1">from last month</span>
      </div>
    </div>
  );
};

export default StatsCard;