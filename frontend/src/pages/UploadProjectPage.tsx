import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// Example tech stack options
const TECH_OPTIONS = [
  "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL",
  "Tailwind CSS", "TypeScript", "JavaScript", "Python", "Django", "Flask",
  "AWS", "Vercel", "Netlify", "Docker", "Kubernetes"
];

function validateGithubUrl(url: string) {
  return /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(url);
}
function validateUrl(url: string) {
  return /^https?:\/\/.+\..+/.test(url);
}

const MAX_TITLE_LENGTH = 100;

const UploadProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    techStack: [] as string[],
    customTechInput: "",
    github: "",
    liveDemo: "",
    thumbnail: null as File | null,
    thumbnailUrl: "",
    youtube: "",
    tags: [] as string[],
    tagInput: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Handle form changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Tech stack multi-select
  const handleTechChange = (tech: string) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }));
    setErrors((prev) => ({ ...prev, techStack: "" }));
  };

  // Custom tech input
  const handleCustomTechInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, customTechInput: e.target.value }));
  };
  const handleCustomTechAdd = () => {
    const tech = form.customTechInput.trim();
    if (tech && !form.techStack.includes(tech)) {
      setForm((prev) => ({
        ...prev,
        techStack: [...prev.techStack, tech],
        customTechInput: "",
      }));
    }
  };
  const handleTechRemove = (tech: string) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  };

  // Thumbnail upload (for now, just preview and store URL string)
  const handleThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, thumbnail: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
      // In production, upload to storage and set thumbnailUrl
      setForm((prev) => ({ ...prev, thumbnailUrl: "" }));
    } else {
      setPreview(null);
    }
  };

  // Tags
  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, tagInput: e.target.value }));
  };
  const handleTagAdd = () => {
    const tag = form.tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
        tagInput: "",
      }));
    }
  };
  const handleTagRemove = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Project title is required.";
    else if (form.title.length > MAX_TITLE_LENGTH) newErrors.title = "Max 100 characters.";
    if (!form.shortDesc.trim()) newErrors.shortDesc = "Short description required.";
    if (!form.fullDesc.trim()) newErrors.fullDesc = "Full description required.";
    if (form.techStack.length === 0) newErrors.techStack = "Select or add at least one tech.";
    if (!form.github.trim()) newErrors.github = "GitHub link required.";
    else if (!validateGithubUrl(form.github)) newErrors.github = "Invalid GitHub repo URL.";
    if (form.liveDemo && !validateUrl(form.liveDemo)) newErrors.liveDemo = "Invalid URL.";
    if (form.youtube && !validateUrl(form.youtube)) newErrors.youtube = "Invalid URL.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);

    // Prepare payload (for now, thumbnailUrl is empty unless you implement upload)
    const payload = {
      title: form.title,
      shortDesc: form.shortDesc,
      fullDesc: form.fullDesc,
      techStack: form.techStack,
      github: form.github,
      liveDemo: form.liveDemo,
      youtube: form.youtube,
      tags: form.tags,
      thumbnailUrl: form.thumbnailUrl, // Implement upload if needed
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to upload project");
      await res.json();
      setSubmitting(false);
      alert("Project submitted successfully!");
      navigate("/");
    } catch (err) {
      setSubmitting(false);
      alert("There was an error submitting your project.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Upload a New Project</h2>
          <p className="text-gray-500 mb-8">
            Share your project with the community. Fields marked <span className="text-red-500">*</span> are required.
          </p>
          <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
            {/* Project Title */}
            <div>
              <label className="block font-medium mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                maxLength={MAX_TITLE_LENGTH}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.title ? "border-red-500" : "border-neutral-200"}`}
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. My Awesome App"
                required
              />
              <div className="flex justify-between text-xs mt-1">
                <span className="text-red-500">{errors.title}</span>
                <span className="text-gray-400">{form.title.length}/{MAX_TITLE_LENGTH}</span>
              </div>
            </div>
            {/* Short Description */}
            <div>
              <label className="block font-medium mb-1">
                Short Description <span className="text-red-500">*</span>
              </label>
              <input
                name="shortDesc"
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.shortDesc ? "border-red-500" : "border-neutral-200"}`}
                value={form.shortDesc}
                onChange={handleChange}
                placeholder="A concise summary (1–2 lines)"
                required
              />
              <span className="text-red-500 text-xs">{errors.shortDesc}</span>
            </div>
            {/* Full Description */}
            <div>
              <label className="block font-medium mb-1">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="fullDesc"
                rows={7}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.fullDesc ? "border-red-500" : "border-neutral-200"}`}
                value={form.fullDesc}
                onChange={handleChange}
                placeholder="Explain your project in detail. Markdown supported."
                required
              />
              <span className="text-red-500 text-xs">{errors.fullDesc}</span>
            </div>
            {/* Tech Stack */}
            <div>
              <label className="block font-medium mb-1">
                Tech Stack <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {TECH_OPTIONS.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-sm ${form.techStack.includes(tech)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-neutral-200 hover:bg-indigo-50"
                    }`}
                    onClick={() => handleTechChange(tech)}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              {/* Custom tech input */}
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={form.customTechInput}
                  onChange={handleCustomTechInput}
                  className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none"
                  placeholder="Add custom tech and press Enter"
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleCustomTechAdd(); } }}
                />
                <button
                  type="button"
                  onClick={handleCustomTechAdd}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Add
                </button>
              </div>
              {/* Display selected techs */}
              <div className="flex flex-wrap gap-2">
                {form.techStack.map((tech) => (
                  <span key={tech} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs flex items-center">
                    {tech}
                    <button
                      type="button"
                      className="ml-1 text-indigo-500 hover:text-red-500"
                      onClick={() => handleTechRemove(tech)}
                      title="Remove"
                    >×</button>
                  </span>
                ))}
              </div>
              <span className="text-red-500 text-xs">{errors.techStack}</span>
            </div>
            {/* GitHub Link */}
            <div>
              <label className="block font-medium mb-1">
                GitHub Link <span className="text-red-500">*</span>
              </label>
              <input
                name="github"
                type="url"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.github ? "border-red-500" : "border-neutral-200"}`}
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                required
              />
              <span className="text-red-500 text-xs">{errors.github}</span>
            </div>
            {/* Live Demo Link */}
            <div>
              <label className="block font-medium mb-1">
                Live Demo Link
              </label>
              <input
                name="liveDemo"
                type="url"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.liveDemo ? "border-red-500" : "border-neutral-200"}`}
                value={form.liveDemo}
                onChange={handleChange}
                placeholder="https://yourapp.com"
              />
              <span className="text-red-500 text-xs">{errors.liveDemo}</span>
            </div>
            {/* Thumbnail / Screenshot */}
            <div>
              <label className="block font-medium mb-1">
                Thumbnail / Screenshot
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnail}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <div className="mt-2">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-40 h-24 object-cover rounded shadow" />
                ) : (
                  <span className="text-gray-400 text-sm">No image selected.</span>
                )}
              </div>
            </div>
            {/* YouTube Demo Link */}
            <div>
              <label className="block font-medium mb-1">
                YouTube Demo Link
              </label>
              <input
                name="youtube"
                type="url"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.youtube ? "border-red-500" : "border-neutral-200"}`}
                value={form.youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
              />
              <span className="text-red-500 text-xs">{errors.youtube}</span>
            </div>
            {/* Tags / Keywords */}
            <div>
              <label className="block font-medium mb-1">
                Tags / Keywords
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={form.tagInput}
                  onChange={handleTagInput}
                  className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none"
                  placeholder="Add a tag and press Enter"
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleTagAdd(); } }}
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs flex items-center">
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-indigo-500 hover:text-red-500"
                      onClick={() => handleTagRemove(tag)}
                      title="Remove tag"
                    >×</button>
                  </span>
                ))}
              </div>
            </div>
            {/* Submit */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Upload Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadProjectsPage;
