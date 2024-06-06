import { Button } from "@/components/ui/button";

interface ButtonInterface {
  text: string;
  onTap: () => void;
  hide?: boolean;
}

export function NextButton({ text, onTap }: ButtonInterface) {
  return (
    <button
      className="px-4 py-2 bg-green_1"
      style={{
        borderRadius: "6px",
      }}
      onClick={onTap}
    >
      {text}
    </button>
  );
}
export function PreviousButton({ text, onTap, hide }: ButtonInterface) {
  return (
    <Button
      className={`${hide && "invisible"}  mx-2 border border-white rounded-[10px] text-white hover:text-slate-300`}
      onClick={onTap}
      variant="outline"
    >
      {" "}
      {text}
    </Button>
  );
}
export function SubmitButton({ text, onTap }: ButtonInterface) {
  return <div onClick={onTap}>{text}</div>;
}
