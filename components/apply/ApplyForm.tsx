'use client';

export function ApplyForm() {
  return (
    <form>
      {/* TODO: 지원 신청 폼 구현 */}
      <div>
        <label>지원 동기</label>
        <textarea placeholder="지원 동기를 작성해주세요" />
      </div>
      <div>
        <label>관련 경험</label>
        <textarea placeholder="관련 경험을 작성해주세요" />
      </div>
      <div>
        <label>기대사항</label>
        <textarea placeholder="기대사항을 작성해주세요" />
      </div>
      <button type="submit">제출</button>
    </form>
  );
}
