"use client";

import StatCard from "./StatsGrid";



export default function StatsGrid({ stats }) {
  return (
    <div className="flex justify-between  gap-5">
      {stats.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}