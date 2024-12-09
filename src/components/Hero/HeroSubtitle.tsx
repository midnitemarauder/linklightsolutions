interface HeroSubtitleProps {
  text: string;
}

export default function HeroSubtitle({ text }: HeroSubtitleProps) {
  return (
    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
      {text}
    </p>
  );
}