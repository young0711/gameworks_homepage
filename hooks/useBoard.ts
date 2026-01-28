'use client';

import { useState, useEffect } from 'react';
import type { PostWithAuthor } from '@/types/board';

/**
 * 게시판 관련 커스텀 훅
 */
export function useBoard() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        // TODO: 게시글 목록 조회 로직 구현
        setPosts([]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refetch: () => {
      // TODO: 재조회 로직
    },
  };
}
