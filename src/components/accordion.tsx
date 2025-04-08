import { Check } from "lucide-react"; // You can also use another icon if needed

export default function Accordion({ stepNo = 0 }: { stepNo?: number }) {
  const steps = 3;

  return (
    <div className="w-full flex items-center justify-between px-4 relative">
      <div className="absolute top-1/2 left-[35px] right-[35px] h-[1px] bg-blue-700 z-0" />

      {Array.from({ length: steps + 1 }, (_, index) => {
        const isCompleted = index < stepNo;
        const isActive = index === stepNo;

        return (
          <div
            key={index}
            className={`z-10 flex items-center justify-center aspect-square w-[50px] m-[7px] rounded-full border-2 transition-all duration-200
              ${isActive ? 'bg-blue-700 text-white border-blue-700 font-bold shadow-md' :
              isCompleted ? 'bg-blue-700 text-white border-blue-700' :
              'bg-white text-blue-700 border-blue-700'}
            `}
          >
            {isCompleted ? (
              <Check className="w-6 h-6" />
            ) : (
              <span className="text-lg">{index + 1}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
