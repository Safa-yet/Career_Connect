"use client";

import { Card } from "@heroui/react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "#00B96D",
}) {
  return (
    <Card className="border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
      <Card.Content className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>

            <h3 className="mt-2 text-3xl font-bold text-[#091E21]">
              {value}
            </h3>

            {subtitle && (
              <p className="mt-1 text-xs text-gray-400">
                {subtitle}
              </p>
            )}
          </div>

          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: `${color}15`,
            }}
          >
            <Icon
              size={22}
              style={{
                color,
              }}
            />
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}