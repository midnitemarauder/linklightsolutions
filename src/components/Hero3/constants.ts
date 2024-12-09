export const ANIMATION_CONFIG = {
  NODES_COUNT: 30,
  LINES_COUNT: 15,
  NODE_CLASS: 'absolute w-2 h-2 rounded-full bg-blue-500/30 transition-all duration-300',
  LINE_CLASS: 'absolute h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform-gpu transition-opacity duration-500'
} as const;

export const Z_INDICES = {
  BASE: 1,
  NETWORK: 2,
  GRID: 3,
  OVERLAY: 4,
  CONTENT: 10
} as const;