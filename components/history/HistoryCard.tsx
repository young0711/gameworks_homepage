'use client';

interface HistoryCardProps {
  year: number;
  title: string;
  description?: string;
  imageUrl?: string;
}

export function HistoryCard({ year, title, description, imageUrl }: HistoryCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-2xl font-bold">{year}</div>
      <h3 className="mt-2 font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      {imageUrl && <img src={imageUrl} alt={title} className="mt-4 h-48 w-full object-cover" />}
    </div>
  );
}
