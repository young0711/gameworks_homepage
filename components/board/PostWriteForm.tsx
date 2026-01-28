'use client';

export function PostWriteForm() {
  return (
    <form>
      {/* TODO: 게시글 작성 폼 구현 */}
      <input type="text" placeholder="제목" />
      <textarea placeholder="내용" />
      <button type="submit">작성</button>
    </form>
  );
}
