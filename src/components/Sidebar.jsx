import { useState } from "react";
import "./Sidebar.css";
import { Rows01, Folder, ChevronDown } from "@untitledui/icons";

function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [openFolder, setOpenFolder] = useState(null);

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
          <button className="submenu-item">Биология</button>
          <button className="submenu-item">География</button>
          <button className="submenu-item">Программирование</button>
          <button className="submenu-item">Физика</button>
          <button className="submenu-item">Химия</button>
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
          <button className="submenu-item">Все проекты</button>
          <button className="submenu-item">Избранные</button>
          <button className="submenu-item">Командные</button>
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
    />
    <button className="sub-item create-btn">Создать</button>
  </div>
)}

    </div>
  );
}

export default Sidebar;
