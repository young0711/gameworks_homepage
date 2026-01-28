'use client';

import { useIntersectionObserver } from './useIntersectionObserver';

/**
 * 스크롤 기반 애니메이션 훅
 * useIntersectionObserver의 래퍼
 */
export function useScrollAnimation() {
  const { targetRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

  return {
    ref: targetRef,
    inView: isIntersecting,
    hasIntersected,
  };
}
