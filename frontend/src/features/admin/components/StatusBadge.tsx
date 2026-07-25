import React from 'react';

interface StatusBadgeProps {
  status?: string | boolean;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  let isPositive = false;
  let text = label || String(status);

  if (typeof status === 'boolean') {
    isPositive = status;
    text = label || (status ? 'Enabled' : 'Disabled');
  } else if (typeof status === 'string') {
    const lower = status.toLowerCase();
    isPositive = ['published', 'active', 'completed', 'featured', 'enabled', 'success'].includes(lower);
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
        isPositive
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          isPositive ? 'bg-emerald-500' : 'bg-amber-500'
        }`}
      />
      {text}
    </span>
  );
};
