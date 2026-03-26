import React from "react";
import ImageCarousel from "./ImageCarousel";

function ProjectCard({ project }) {
  return (
    <article className="project-card" style={{ backgroundColor: project.color }}>
      <div className="card-body">
        <div className="card-top">
          <div className="card-info">
            <h2 className="card-title">{project.title}</h2>
            <p className="card-description">{project.description}</p>
            <div className="card-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project &rarr;
            </a>
          </div>
          {project.images && project.images.length > 0 && (
            <div className="card-carousel">
              <ImageCarousel images={project.images} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
