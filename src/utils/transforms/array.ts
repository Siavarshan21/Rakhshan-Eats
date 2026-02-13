export function groupBy<T>(items: readonly T[], keyFn: (item: T) => string): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}

export function sortBy<T>(
  items: readonly T[],
  keyFn: (item: T) => string | number,
  order: 'asc' | 'desc' = 'asc',
): T[] {
  return [...items].sort((a, b) => {
    const valA = keyFn(a);
    const valB = keyFn(b);

    let comparison: number;
    if (typeof valA === 'string' && typeof valB === 'string') {
      comparison = valA.localeCompare(valB);
    } else {
      comparison = (valA as number) - (valB as number);
    }

    return order === 'asc' ? comparison : -comparison;
  });
}

export function uniqueBy<T>(items: readonly T[], keyFn: (item: T) => string | number): T[] {
  const seen = new Set<string | number>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be a positive number');
  }

  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}
