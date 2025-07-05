import React from "react";

// Project and techColors types should match your main file
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

const techColors: Record<string, string> = {
  "React": "bg-blue-100 text-blue-800",
  "Tailwind CSS": "bg-teal-100 text-teal-800",
  "Vercel": "bg-black text-white",
  "Node.js": "bg-green-100 text-green-800",
  "Socket.io": "bg-gray-100 text-gray-800",
  "Express": "bg-gray-200 text-gray-900",
  "MongoDB": "bg-green-200 text-green-900",
  "JWT": "bg-yellow-100 text-yellow-800",
  // Add more tech colors as needed
};

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => (
  <div className="max-w-5xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.length === 0 && (
        <div className="col-span-full text-neutral-500 text-center">
          No projects found.
        </div>
      )}
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-2xl shadow-md border border-neutral-100 p-6 flex flex-col justify-between transition hover:shadow-lg hover:-translate-y-1"
        >
          {/* User Profile Line */}
          <div className="flex items-center mb-2">
            <a href={project.user.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img
                src={project.user.avatar}
                alt={project.user.name}
                className="w-8 h-8 rounded-full mr-2 border"
              />
              <span className="text-sm font-medium text-neutral-700 hover:underline">{project.user.name}</span>
            </a>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">{project.title}</h3>
            <p className="text-neutral-700 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${techColors[tech] || "bg-gray-100 text-gray-800"}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
            >
              View Project
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectsGrid;
