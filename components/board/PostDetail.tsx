'use client';

interface PostDetailProps {
  id: string;
}

export function PostDetail({ id }: PostDetailProps) {
  return (
    <div>
      {/* TODO: 게시글 상세 구현 */}
      <p>Post Detail: {id}</p>
    </div>
  );
}
