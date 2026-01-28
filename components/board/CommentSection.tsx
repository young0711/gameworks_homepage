'use client';

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  return (
    <div>
      {/* TODO: 댓글 섹션 구현 */}
      <p>Comments for post: {postId}</p>
    </div>
  );
}
