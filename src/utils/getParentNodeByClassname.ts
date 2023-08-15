export function getParentNodeByClassname(
  element: HTMLElement,
  className: string
): HTMLElement | null {
  if (!element.parentElement) return null;

  return element.parentElement.classList.contains(className)
    ? element.parentElement
    : getParentNodeByClassname(element.parentElement, className);
}
