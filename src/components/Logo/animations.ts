export const logoAnimations = {
  tilt: (x: number, y: number, centerX: number, centerY: number) => {
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  },
  
  reset: () => 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  
  imageFilter: (isHovered: boolean) => ({
    filter: `contrast(1.2) ${isHovered ? 'hue-rotate(15deg)' : 'hue-rotate(0deg)'}`,
    transformStyle: 'preserve-3d' as const
  })
};