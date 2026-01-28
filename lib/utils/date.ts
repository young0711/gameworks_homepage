import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 포맷팅합니다.
 * @param date - Date 객체 또는 ISO 문자열
 * @param formatStr - 포맷 문자열 (date-fns 형식)
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(date: Date | string, formatStr: string = 'yyyy-MM-dd'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: ko });
}

/**
 * 상대 시간을 반환합니다. (예: "3일 전")
 * @param date - Date 객체 또는 ISO 문자열
 * @returns 상대 시간 문자열
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ko });
}
