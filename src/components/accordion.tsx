
export default function Accordion(props: { stepNo?: number }) {
    var steps = 3;
    return (
        <div className="w-full flex items-center justify-between px-4 relative">
            {/* Line connecting circles */}
            <div className="absolute top-1/2 left-[35px] right-[35px] h-[1px] bg-blue-700 z-0" />

            {/* Steps */}
            {Array.from({ length: steps+1 }, (_, index) => (
                <div
                    key={index}
                    className="z-10 flex items-center justify-center aspect-square w-[50px] m-[7px] border border-blue-700 rounded-full bg-white"
                >
                    <span className="text-lg">{index + 1}</span>
                </div>
            ))}
        </div>
    );
}
