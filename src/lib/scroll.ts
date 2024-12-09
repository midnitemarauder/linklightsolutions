export const scrollToSection = (id: string): void => {
  const element = document.getElementById(id);
  if (!element) return;

  const navHeight = 80; // Fixed navbar height
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - navHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};