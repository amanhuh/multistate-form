export default function Two() {

  const handleChange = () => {
    
  };

  return (
    <div className="">
      <p className="text-2xl font-bold mb-5">Education Details</p>
      <div className="flex flex-col">
        <label htmlFor="clgName" className="text-sm font-semibold mb-2">College Name</label>
        <input
          name="clgName"
          className="border-2 border-gray-300 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700! rounded-lg px-3 py-1.5"
          placeholder="Enter your college name"
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="course" className="text-sm font-semibold mb-2">
          Course
        </label>
        <input
          name="course"
          className="border-2 border-gray-300 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700! rounded-lg px-3 py-1.5"
          placeholder="Enter your course name"
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex flex-col">
          <label htmlFor="class" className="text-sm font-semibold mb-2">
            Class
          </label>
          <input name="class" className="border-2 border-gray-300 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700! rounded-lg px-3 py-1.5" placeholder="eg: SYIT" onChange={handleChange}></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="div" className="text-sm font-semibold mb-2">
            Div
          </label>
          <input name="div" className="border-2 border-gray-300 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700! rounded-lg px-3 py-1.5" placeholder="eg: A" onChange={handleChange}></input>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="rollNo" className="text-sm font-semibold mb-2">
          Roll No
        </label>
        <input
          name="rollNo"
          className="border-2 border-gray-300 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700! rounded-lg px-3 py-1.5"
          placeholder="Enter your roll number"
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
}
