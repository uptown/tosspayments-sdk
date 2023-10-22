export function filterUndefined(obj: { [key: string]: string | any | undefined }): {
  [key: string]: string
} {
  const result: { [key: string]: string } = {};

  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key]!;
    }
  }

  return result;
}
