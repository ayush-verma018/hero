CREATE DATABASE heroBackend

CREATE TABLE program (
    program_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    domain VARCHAR(50) NOT NULL,
    program_type VARCHAR(50) NOT NULL,
    registrations_status BOOLEAN NOT NULL,
    description TEXT NOT NULL,
    placement_assurance BOOLEAN,
    image_url VARCHAR(255),
    university_name VARCHAR(255) NOT NULL,
    faculty_profile_url VARCHAR(255),
    learning_hours INTEGER NOT NULL,
    duration INTEGER NOT NULL,
    certificate_type VARCHAR(50) NOT NULL,
    eligibility_criteria TEXT NOT NULL
);

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');