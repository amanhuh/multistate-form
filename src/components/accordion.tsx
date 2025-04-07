import clsx from "clsx";


export default function Accordion() {
    var steps = 3;
    return (
        <div className="flex-center flex-row w-full h-max">
            {Array.from({ length: steps }, (_, index) => (
                <div key={index} className="flex-center flex-row w-max ">
                    <div className="flex-center h-[35px] aspect-square border-blue-700 border rounded-full relative">
                        <span className="absolute text-lg">{index + 1}</span>
                    </div>
                    {/* Render the line only if it's not the last step */}
                    {index !== steps - 1 && (
                        <span className="h-[1px] w-full bg-blue-700"></span>
                    )}
                </div>
            ))}
        </div>
    );    
}