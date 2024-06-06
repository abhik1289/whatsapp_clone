import React from "react";

interface Step {
  id: number;
  title: string;
  subHeadline: string;
}

interface StepsProps {
  step: number;
}

const Steps: React.FC<StepsProps> = ({ step }) => {
  const stepsList: Step[] = [
    { id: 1, title: "Personal Info", subHeadline: "Step 1" },
    { id: 2, title: "Verification", subHeadline: "Step 2" },
    { id: 3, title: "Basic Setup", subHeadline: "Step 3" },
    { id: 4, title: "Completed", subHeadline: "Step 4" },
  ];

  return (
    <div className="md:w-5/12 w-full px-3 md:py-4 py-2">
      <div className="wrapper w-full md:block flex justify-center gap-4">
        {stepsList.map((stepItem) => (
          <div
            key={stepItem.id}
            className="main_wrapper flex md:flex-row  text-dark_text_1 my-2 gap-2 items-center"
          >
            <div
              style={{
                border: "1px solid white",
              }}
              className={
                stepItem.id == step
                  ? "w-[40px] h-[40px] flex justify-center items-center rounded-full bg-dark_svg_2"
                  : "w-[40px] h-[40px] flex justify-center items-center rounded-full"
              }
            >
              {stepItem.id}
            </div>
            <div className="right_content md:block hidden">
              <div className={`${stepItem.id == step?"subHeadline text-dark_text_1 font-font3":"subHeadline text-dark_svg_1 font-font3"}`}>
                {stepItem.subHeadline}
              </div>
              <div className="title uppercase font-font2">{stepItem.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
