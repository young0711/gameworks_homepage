'use client';

interface MemberCardProps {
  name: string;
  position: string;
  imageUrl?: string;
  techStack?: string[];
}

export function MemberCard({ name, position, imageUrl, techStack }: MemberCardProps) {
  return (
    <div className="rounded-lg border p-4">
      {imageUrl && <img src={imageUrl} alt={name} className="mb-2 h-32 w-32 rounded-full" />}
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground">{position}</p>
      {techStack && (
        <div className="mt-2 flex flex-wrap gap-1">
          {techStack.map((tech) => (
            <span key={tech} className="rounded bg-gray-100 px-2 py-1 text-xs">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
