import { useState } from "react";

/* eslint-disable react/prop-types */
const ProgramForm = ({ program, onCancel }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedProgram, setEditedProgram] = useState({ ...program });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProgram((prevProgram) => ({
      ...prevProgram,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      // Ensure editedProgram has the correct structure before sending
      const updatedProgram = {
        name: editedProgram.name,
        domain: editedProgram.domain,
        duration: parseInt(editedProgram.duration, 10),
        program_type: editedProgram.program_type,
        registrations_status: editedProgram.registrations_status,
        university: editedProgram.university,
        certificate_type: editedProgram.certificate_type,
        learning_hours: parseInt(editedProgram.learning_hours, 10),
        price: parseFloat(editedProgram.price),
        eligibility_criteria: editedProgram.eligibility_criteria,
        image_url: editedProgram.image_url,
        faculty_profile_url: editedProgram.faculty_profile_url,
        description: editedProgram.description,
      };

      // Make the API call to update the program data
      const response = await fetch(
        `http://localhost:5000/dashboard/editProgram/${program.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProgram),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update program");
      }

      // Exit edit mode and update the program details
      setEditMode(false);
      // You may want to refresh the program list or perform additional actions here
    } catch (error) {
      console.error("Error updating program:", error.message);
      // Handle error scenarios if needed
    }
  };

  const handleEditClick = () => {
    // Toggle the editMode state
    setEditMode((prevEditMode) => !prevEditMode);
  };

  console.log("program", program);
  return (
    <div>
      {/* Display program details in the form */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{`${program.name} Program Details`}</h2>
        <div className="flex items-center">
          {editMode && (
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white mx-2 p-2 rounded-3xl hover:bg-green-600 transition duration-300"
            >
              Save
            </button>
          )}
          <button
            onClick={handleEditClick}
            className={`bg-blue-500 text-white mx-2 p-2 rounded-3xl hover:bg-blue-600 transition duration-300 ${
              editMode ? "hidden" : ""
            }`}
          >
            Edit
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 rounded-3xl hover:bg-gray-600 transition duration-300"
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <form>
        <div className="flex mb-3">
          {/* First Line */}
          <div className="w-1/3 pr-2">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editMode ? editedProgram.name : program.name}
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div className="w-1/3 pr-2">
            <label
              htmlFor="domain"
              className="block text-gray-700 font-bold mb-2"
            >
              Domain:
            </label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={editMode ? editedProgram.domain : program.domain}
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div className="w-1/3 pr-2">
            <label
              htmlFor="duration"
              className="block text-gray-700 font-bold mb-2"
            >
              Duration (in months):
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={editMode ? editedProgram.duration : program.duration}
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="flex mb-3">
          {/* Second Line */}
          <div className="w-1/3 pr-2">
            <label
              htmlFor="program_type"
              className="block text-gray-700 font-bold mb-2"
            >
              Program Type:
            </label>
            <input
              type="text"
              id="program_type"
              name="program_type"
              value={
                editMode ? editedProgram.program_type : program.program_type
              }
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div className="w-1/3 pr-2">
            <label
              htmlFor="registrations_status"
              className="block text-gray-700 font-bold mb-2"
            >
              Registrations Open:
            </label>
            <select
              id="registrations_status"
              name="registrations_status"
              value={
                editMode
                  ? editedProgram.registrations_status
                  : program.registrations_status
                  ? "YES"
                  : "NO"
              }
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="w-1/3">
            <label
              htmlFor="university"
              className="block text-gray-700 font-bold mb-2"
            >
              University Name:
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={
                editMode
                  ? editedProgram.university_name
                  : program.university_name
              }
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="flex mb-3">
          {/* Third Line */}
          <div className="w-1/3 pr-2">
            <label
              htmlFor="certificate_type"
              className="block text-gray-700 font-bold mb-2"
            >
              Certificate Type:
            </label>
            <input
              type="text"
              id="certificate_type"
              name="certificate_type"
              value={
                editMode
                  ? editedProgram.certificate_type
                  : program.certificate_type
              }
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div className="w-1/3 pr-2">
            <label
              htmlFor="learning_hours"
              className="block text-gray-700 font-bold mb-2"
            >
              Learning Hours:
            </label>
            <input
              type="text"
              id="learning_hours"
              name="learning_hours"
              value={
                editMode ? editedProgram.learning_hours : program.learning_hours
              }
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div className="w-1/3">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price (INR):
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={editMode ? editedProgram.price : program.price}
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="flex mb-3">
          {/* Fourth Line */}
          <div className="w-1/3 pr-2">
            <label
              htmlFor="eligibility_criteria"
              className="block text-gray-700 font-bold mb-2"
            >
              Eligibility Criteria:
            </label>
            <input
              type="text"
              id="eligibility_criteria"
              name="eligibility_criteria"
              value={
                editMode
                  ? editedProgram.eligibility_criteria
                  : program.eligibility_criteria
              }
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div className="w-1/3 pr-2">
            <label
              htmlFor="image_url"
              className="block text-gray-700 font-bold mb-2"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={editMode ? editedProgram.image_url : program.image_url}
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div className="w-1/3">
            <label
              htmlFor="faculty_profile_url"
              className="block text-gray-700 font-bold mb-2"
            >
              Faculty Image URL:
            </label>
            <input
              type="text"
              id="faculty_profile_url"
              name="faculty_profile_url"
              value={
                editMode
                  ? editedProgram.faculty_profile_url
                  : program.faculty_profile_url
              }
              onChange={handleInputChange}
              readOnly={!editMode}
              className="border rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="flex mb-3">
          {/* Fifth Line */}
          <div className="w-full">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={editMode ? editedProgram.description : program.description}
              onChange={handleInputChange}
              readOnly={!editMode}
              rows={3}
              className="border rounded-md p-2 w-full"
            />
          </div>
        </div>

        {/* ... Additional field groups */}
      </form>
    </div>
  );
};

export default ProgramForm;
