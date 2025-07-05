import React from 'react';
import { Briefcase, FileText, Code } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const FeatureCards: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: <Briefcase className="h-8 w-8 text-blue-600" />,
      title: "Make your own Portfolio",
      description: "Find curated internship opportunities that match your skills.",
      cta: "Explore Templates",
      ctaColor: "bg-blue-600 hover:bg-blue-700",
      bgColor: "bg-blue-50",
      iconBgColor: "bg-blue-100"
    },
    {
      id: 2,
      icon: <FileText className="h-8 w-8 text-green-600" />,
      title: "Resume Builder",
      description: "Build an ATS-optimized resume in minutes.",
      cta: "Start Now",
      ctaColor: "bg-green-600 hover:bg-green-700",
      bgColor: "bg-green-50",
      iconBgColor: "bg-green-100"
    },
    {
      id: 3,
      icon: <Code className="h-8 w-8 text-purple-600" />,
      title: "Freelance Projects",
      description: "Upload projects you've built and earn as a freelancer.",
      cta: "Start Selling",
      ctaColor: "bg-purple-600 hover:bg-purple-700",
      bgColor: "bg-purple-50",
      iconBgColor: "bg-purple-100"
    }
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Boost Your Career Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(feature => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};