import Accordion from "@/components/accordion";

export default function Home() {
  return (
    <div className="flex-center flex-col [&>*]:w-full">
      <section className="py-[30px]">
        <div className="flex-center mb-[25px] text-3xl font-bold">
          <h1>Student Details</h1>
        </div>
        <Accordion></Accordion>
      </section>
      <section>
        <form className="bg-gray-60 rounded-[30px] shadow-md p-4 rounded-3xl bg-gray-50 min-w-3xs min-h-[25vh]">
        </form>
      </section>
    </div>
  );
}
