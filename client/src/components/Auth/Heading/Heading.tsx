export default function Heading({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="heading">
      <div className="mainText font-font2 dark:text-dark_text_1 text-2xl">
        {title}
      </div>
      <div className="subText font-font2 dark:text-dark_text_2 mt-3 italic">
        {text}
      </div>
    </div>
  );
}
