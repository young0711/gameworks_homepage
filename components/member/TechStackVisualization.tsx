'use client';

interface TechStackVisualizationProps {
  techStack: string[];
}

export function TechStackVisualization({ techStack }: TechStackVisualizationProps) {
  return (
    <div>
      {/* TODO: 기술 스택 시각화 구현 */}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span key={tech} className="rounded bg-blue-100 px-3 py-1">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
