import React from 'react';

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  ctaColor: string;
  bgColor: string;
  iconBgColor: string;
}

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className={`rounded-xl p-6 ${feature.bgColor} transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg`}>
      <div className={`${feature.iconBgColor} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
      <p className="text-gray-700 mb-6">{feature.description}</p>
      <button className={`${feature.ctaColor} text-white py-2 px-4 rounded-lg transition-colors duration-200`}>
        {feature.cta}
      </button>
    </div>
  );
};