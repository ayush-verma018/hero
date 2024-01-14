const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");

router.post("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.id]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get all programs
router.get("/programs", authorize, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM program");
    const programs = result.rows;

    res.status(200).json({ success: true, programs });
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
// get a program
router.get("/programs/:program_id", authorize, async (req, res) => {
  try {
    const programId = req.params.program_id;
    const result = await pool.query(
      "SELECT * FROM program WHERE program_id = $1",
      [programId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: "Program not found" });
    } else {
      const program = result.rows[0];
      res.status(200).json({ success: true, program });
    }
  } catch (error) {
    console.error("Error fetching program:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
// create a program
router.post("/addProgram", authorize, async (req, res) => {
  try {
    const {
      name,
      price,
      domain,
      program_type,
      registrations_status,
      description,
      placement_assurance,
      image_url,
      university_name,
      faculty_profile_url,
      learning_hours,
      duration,
      certificate_type,
      eligibility_criteria,
    } = req.body;

    // Insert data into the database
    const result = await pool.query(
      "INSERT INTO program (name, price, domain, program_type, registrations_status, description, placement_assurance, image_url, university_name, faculty_profile_url, learning_hours, duration, certificate_type, eligibility_criteria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      [
        name,
        price,
        domain,
        program_type,
        registrations_status,
        description,
        placement_assurance,
        image_url,
        university_name,
        faculty_profile_url,
        learning_hours,
        duration,
        certificate_type,
        eligibility_criteria,
      ]
    );

    const insertedProgram = result.rows[0];
    res.status(201).json({ success: true, program: insertedProgram });
  } catch (error) {
    console.error("Error inserting program data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
// update a program
router.put("/editProgram/:program_id", authorize, async (req, res) => {
  try {
    const programId = req.params.program_id;
    const checkResult = await pool.query(
      "SELECT * FROM program WHERE program_id = $1",
      [programId]
    );

    if (checkResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Program not found" });
    }

    const {
      name,
      price,
      domain,
      program_type,
      registrations_status,
      description,
      placement_assurance,
      image_url,
      university_name,
      faculty_profile_url,
      learning_hours,
      duration,
      certificate_type,
      eligibility_criteria,
    } = req.body;

    const updateResult = await pool.query(
      "UPDATE program SET name = $1, price = $2, domain = $3, program_type = $4, registrations_status = $5, description = $6, placement_assurance = $7, image_url = $8, university_name = $9, faculty_profile_url = $10, learning_hours = $11, duration = $12, certificate_type = $13, eligibility_criteria = $14 WHERE program_id = $15 RETURNING *",
      [
        name,
        price,
        domain,
        program_type,
        registrations_status,
        description,
        placement_assurance,
        image_url,
        university_name,
        faculty_profile_url,
        learning_hours,
        duration,
        certificate_type,
        eligibility_criteria,
        programId,
      ]
    );

    const updatedProgram = updateResult.rows[0];
    res.status(200).json({ success: true, program: updatedProgram });
  } catch (error) {
    console.error("Error updating program:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// delete a program
router.delete("/deleteProgram/:program_id", authorize, async (req, res) => {
  try {
    const programId = req.params.program_id;
    const checkResult = await pool.query(
      "SELECT * FROM program WHERE program_id = $1",
      [programId]
    );

    if (checkResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Program not found" });
    }

    await pool.query("DELETE FROM program WHERE program_id = $1", [programId]);

    res.status(204).json({ success: true });
  } catch (error) {
    console.error("Error deleting program:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
