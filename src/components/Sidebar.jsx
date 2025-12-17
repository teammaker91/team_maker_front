import { useEffect, useState } from "react";
import "./Sidebar.css";

import { getFilters } from "../api/filters";
import { getProjects, createProject } from "../api/projects";

import { Rows01, Folder, ChevronDown } from "@untitledui/icons";

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [openFolder, setOpenFolder] = useState(null);

const [filters, setFilters] = useState([]);
const [projects, setProjects] = useState([]);
const [newProjectName, setNewProjectName] = useState("");

const handleCreateProject = (e) => {
  e.preventDefault(); // IMPORTANT
  if (!newProjectName.trim()) return;

  createProject(newProjectName).then((newProj) => {
    if (!newProj) return;

    setProjects(prev => [...prev, newProj]);
    setNewProjectName("");
    setOpenFolder("myProjects");
  });
};



  useEffect(() => {
    //filters
    getFilters().then(data => setFilters(data));
    //projects
    getProjects().then(data => setProjects(data));
  }, []);

  const toggleFolder = (folder) => {
    setOpenFolder(openFolder === folder ? null : folder);
  };




  return (
    <div
      className={`sidebar ${expanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* FOLDER 1 — FILTER OF PROJECTS */}
      <button className="sidebar-item" onClick={() => toggleFolder("filter")}>
        <Rows01 className="icon" />
        {expanded && <span>Фильтр проектов</span>}
        {expanded && (
          <ChevronDown
            className={`chevron ${openFolder === "filter" ? "rotated" : ""}`}
          />
        )}
      </button>
      {openFolder === "filter" && expanded && (
        <div className="submenu">

          {filters.map((filter) => (
            <button key={filter} className="submenu-item">
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* FOLDER 2 — MY PROJECTS */}
      <button
        className="sidebar-item"
        onClick={() => toggleFolder("myProjects")}
      >
        <Folder className="icon" />
        {expanded && <span>Мои проекты</span>}
        {expanded && (
          <ChevronDown
            className={`chevron ${openFolder === "myProjects" ? "rotated" : ""}`}
          />
        )}
      </button>
      {openFolder === "myProjects" && expanded && (
       <div className="submenu">
          {projects.length === 0 ? <span className="submenu-item">Пусто</span>
            : projects.map((proj) => (
                <button key={proj.id} className="submenu-item">
                  {proj.name}
                </button>
              ))
          }
        </div>
      )}

      {/* FOLDER 3 — CREATE PROJECT */}

<button
  className="sidebar-item"
  onClick={() => toggleFolder("createProject")}
>
  <span className="icon">+</span>  {/* <- icon replaced */}
  {expanded && <span>Создать проект</span>}
  {expanded && (
    <ChevronDown
      className={`chevron ${openFolder === "createProject" ? "rotated" : ""}`}
    />
  )}
</button>
{openFolder === "createProject" && expanded && (
  <div className="submenu">
    <input
  type="text"
  placeholder="Название проекта"
  className="create-input"
  value={newProjectName}
  onChange={(e) => setNewProjectName(e.target.value)}
/>

 <button type="button" className="sub-item create-btn" onClick={handleCreateProject}>Создать</button>


  </div>
)}

    </div>
  );
}

export default Sidebar;
