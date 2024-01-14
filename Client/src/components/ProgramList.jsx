import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const ProgramList = ({ onProgramClick }) => {
  useEffect(() => {
    // Fetch program data from the backend API
    const fetchPrograms = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/programs"
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch programs");
        }

        const data = await response.json();
        console.log("data", data);
        setPrograms(data.programs);
      } catch (error) {
        console.error("Error fetching programs:", error.message);
      }
    };

    fetchPrograms();
  }, []);

  const [programs, setPrograms] = useState([]);
  console.log("programs", programs);
  const [activeProgram, setActiveProgram] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleProgramClick = (index) => {
    setActiveProgram(index);
    onProgramClick(programs[index]);
  };

  const handleSearch = () => {
    // Perform search logic here based on the searchTerm
    // For simplicity, this example just filters the programs array
    const filteredPrograms = programs.filter((program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setPrograms(filteredPrograms);
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search Programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full border rounded-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-md text-white p-2 ml-2 rounded-3xl hover:bg-blue-600 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <button className="bg-blue-500 text-md text-white p-2 ml-2 rounded-3xl hover:bg-blue-600 transition duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      {/* Program List */}
      <ul>
        {programs.map((program, index) => (
          <li
            key={program.id}
            onClick={() => handleProgramClick(index)}
            className={
              "flex items-center px-4 my-2 py-2 rounded-xl cursor-pointer " +
              (activeProgram === index
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800")
            }
          >
            {program.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramList;
