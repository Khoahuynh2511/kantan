import type { JishoApiResponse } from '../types/dictionary';

export async function searchDictionary(
  keyword: string,
  page: number = 1
): Promise<JishoApiResponse> {
  const response = await fetch(
    `/api/dictionary?keyword=${encodeURIComponent(keyword)}&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dictionary data');
  }

  return response.json();
}
