export function updateParams(currentParams: any, key: string, value: string) {
  const params = new URLSearchParams(currentParams.toString());
  params.set(key, value);
  return params.toString();
}
