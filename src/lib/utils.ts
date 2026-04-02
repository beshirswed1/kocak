// This file was emptied to resolve build errors related to missing dependencies (tailwind-merge, clsx) that were no longer needed after removing unused UI components.
export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
