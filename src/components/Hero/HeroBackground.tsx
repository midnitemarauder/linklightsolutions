export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-gray-900" />
      <div className="absolute inset-0 grid-background opacity-10" />
    </div>
  );
}