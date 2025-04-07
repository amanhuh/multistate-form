import clsx from "clsx";


export default function Accordion() {
    var steps = 3;
    return (
        <div className="border-b px-4 py-2 w-full h-max flex-center">
            <div className="flex-center flex- w-max h-max">
                {Array.from({ length: steps }, (_, index) => (
                    <div key={index} className="flex-center flex-row w-full">
                        <div className="flex-center h-[35px] aspect-square border-blue-700 border rounded-full relative">
                            <span className="absolute text-lg">{index + 1}</span>
                        </div>
                        {/* Render the line only if it's not the last step */}
                        {index !== steps - 1 && (
                            <span className="h-[1px] w-[20px] bg-blue-700"></span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );    
}