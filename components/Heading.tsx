'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  sm?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center, sm }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className={sm ? 'text-3xl font-bold' : 'text-4xl font-bold'}>
        {title}
      </div>
      <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;