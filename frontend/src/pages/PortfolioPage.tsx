import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TemplateGallery } from '../components/TemplateGallery';
import { ArrowRight } from 'lucide-react';

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
          {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center">
            Start Building Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button> */}
        </div>
      </section>

      {/* Template Gallery */}
      <main className="flex-grow">
        <TemplateGallery />
      </main>

      {/* Portfolio Footer CTA */}
      <section className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ready to Create Your Portfolio?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who have built impressive portfolios with our templates. 
            Start showcasing your work today and land your dream opportunities.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};