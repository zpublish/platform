export const copyTextToClipboard = async (text) => {
  if (!navigator.clipboard) {
    return;
  }
  return await navigator.clipboard.writeText(text);
}
