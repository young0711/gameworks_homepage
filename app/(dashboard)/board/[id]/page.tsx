interface BoardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { id } = await params;
  
  return (
    <div>
      <h1>Board Detail</h1>
      <p>Post ID: {id}</p>
      {/* TODO: 게시글 상세 구현 */}
    </div>
  );
}
