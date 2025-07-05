import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TemplateGallery } from '../components/TemplateGallery';

export const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Build Your Perfect Portfolio
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose from our collection of professionally designed portfolio templates. 
            Showcase your work, skills, and achievements with stunning designs that make you stand out.
          </p>
        </div>
      </section>

      {/* Template Gallery */}
      <main className="flex-grow">
        <TemplateGallery />
      </main>

      <Footer />
    </div>
  );
};