'use client';

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  viewCount: number;
}

export function PostCard({ id, title, author, createdAt, viewCount }: PostCardProps) {
  return (
    <div className="border-b p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">
        {author} · {createdAt} · 조회 {viewCount}
      </p>
    </div>
  );
}
