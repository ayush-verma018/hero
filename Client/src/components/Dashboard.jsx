import { useState } from "react";
import NavigationBar from "./NavigationBar";
import ProgramList from "./ProgramList";
import ProgramForm from "./ProgramForm";

const Dashboard = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
  };

  const handleFormCancel = () => {
    setSelectedProgram(null);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* NavigationBar */}
      <NavigationBar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Section */}
        <div className="flex-shrink-0 w-1/5 bg-gray-200 p-4 overflow-y-auto">
          {/* ProgramList Component */}
          <ProgramList onProgramClick={handleProgramClick} />
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          {selectedProgram ? (
            <>
              <ProgramForm
                program={selectedProgram}
                onCancel={handleFormCancel}
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">Programs</h2>
              <p className="text-gray-700 mb-4">
                This page lists various education programs along with detailed
                information about each program.
              </p>
            </>
          )}

          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
