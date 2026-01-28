'use client';

import { useState } from 'react';
import type { ApplicationInsert } from '@/types/apply';

/**
 * 지원 관련 커스텀 훅
 */
export function useApply() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitApplication = async (data: ApplicationInsert) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: 지원 신청 로직 구현
      return { success: true };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to submit application'));
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitApplication,
    loading,
    error,
  };
}
