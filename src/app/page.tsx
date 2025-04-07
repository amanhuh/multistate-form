import Image from "next/image";
import Accordion from "@/components/accordion";

export default function Home() {
  return (
    <>
    <div className="flex-center flex-col [&>*]:w-full">
      <section>
        <Accordion></Accordion>
      </section>
      <section>
        <form className="border border-black rounded-4xl bg-gray-50 min-w-3xs min-h-[25vh]">
        </form>
      </section>
    </div>
    </>
    
  );
}
