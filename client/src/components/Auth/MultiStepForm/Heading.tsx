interface FormInterface {
  title: string;
  subTitle: string;
}

export default function FormHeading({ title, subTitle }: FormInterface) {
  return (
    <div className="form_haeding mt-4">
      <div className="title text-dark_text_1 text-lg font-font2 font-semibold">{title}</div>
      <div className="subTitle text-dark_text_2 font-font1">{subTitle}</div>
    </div>
  );
}
