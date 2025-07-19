import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import ProjectsGrid from '../components/ProjectsGrid';

// Project type (same as before)
type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  url: string;
  user: {
    name: string;
    avatar: string;
    profileUrl: string;
  };
};

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio website built with React and Tailwind CSS.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    url: "https://github.com/yourusername/portfolio",
    user: {
      name: "Karina Sharma",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      profileUrl: "https://github.com/alicejohnson"
    }
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A real-time chat application using Socket.io and Node.js.",
    tech: ["Node.js", "Socket.io", "Express", "React"],
    url: "https://github.com/Aditya-satpute/Portfolio",
    user: {
      name: "Aditya Satpute",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      profileUrl: "https://github.com/Aditya-satpute"
    }
  },
  {
    id: 3,
    title: "E-commerce API",
    description: "RESTful API for an e-commerce platform with JWT authentication.",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    url: "https://github.com/yourusername/ecommerce-api",
    user: {
      name: "Tanishka",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      profileUrl: "https://github.com/carollee"
    }
  },
  // Add more projects as needed
];

const getAllTechs = (projects: Project[]) =>
  Array.from(new Set(projects.flatMap((p) => p.tech))).sort();

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 018 17v-3.586a1 1 0 00-.293-.707L1.293 6.707A1 1 0 011 6V4z"
    />
  </svg>
);

// Upload Project Button Component
const UploadProjectButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/upload")}
      className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition font-semibold"
      type="button"
    >
      Upload Project
    </button>
  );
};

const ProjectsPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const allTechs = getAllTechs(projects);

  // Handle search input
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Handle tech checkbox change
  const handleTechChange = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTechs([]);
    setSearch("");
  };

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  // Filter projects by search and tech stack
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesTech =
      selectedTechs.length === 0 ||
      selectedTechs.every((tech) => project.tech.includes(tech));
    return matchesSearch && matchesTech;
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50">
        {/* Header Section */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Explore Projects from GitHub
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Browse, search, and filter through a curated list of projects. Discover their tech stacks and dive into the code!
            </p>
            {/* Search + Filter Controls */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 w-full max-w-2xl mx-auto">
              <input
                type="text"
                className="w-full md:w-2/3 px-4 py-2 border border-neutral-200 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 transition"
                placeholder="Search projects by name, description, or tech..."
                value={search}
                onChange={handleSearch}
              />
              <div className="relative w-full md:w-auto">
                <button
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-white border border-neutral-200 rounded-lg shadow-sm text-neutral-700 hover:bg-neutral-100 transition focus:outline-none"
                  type="button"
                >
                  <FilterIcon />
                  Filter
                  {selectedTechs.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      {selectedTechs.length}
                    </span>
                  )}
                </button>
                {/* Filter Dropdown */}
                {showFilter && (
                  <div
                    ref={filterRef}
                    className="absolute z-20 mt-2 right-0 w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-4"
                  >
                    <div className="text-sm font-semibold mb-2 text-neutral-700">
                      Filter by Tech Stack
                    </div>
                    <div className="max-h-48 overflow-y-auto flex flex-col gap-2 mb-4">
                      {allTechs.map((tech) => (
                        <label key={tech} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTechs.includes(tech)}
                            onChange={() => handleTechChange(tech)}
                            className="form-checkbox accent-blue-600 mr-2"
                          />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                            {tech}
                          </span>
                        </label>
                      ))}
                    </div>
                    <button
                      onClick={clearFilters}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-300 transition"
                      type="button"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Upload Project Button Section */}
            <div className="flex justify-center mt-6">
              <UploadProjectButton />
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <ProjectsGrid projects={filteredProjects} />
      </div>
      <Footer />
    </>
  );
};

export default ProjectsPage;
