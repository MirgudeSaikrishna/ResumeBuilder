import React, { useState } from "react";
import jsPDF from "jspdf";

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
    url: "",
  });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [experience, setExperience] = useState([]);
  const [newExperience, setNewExperience] = useState("");

  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState("");

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");

  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState({
    institute: "",
    course: "",
    year: "",
    percentage: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const addExperience = () => {
    if (newExperience.trim() !== "") {
      setExperience([...experience, newExperience]);
      setNewExperience("");
    }
  };

  const addAchievement = () => {
    if (newAchievement.trim() !== "") {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement("");
    }
  };

  const addEducation = () => {
    const { institute, course, year, percentage } = newEducation;
    if (institute && course && year && percentage) {
      setEducation([
        ...education,
        { institute, course, year, percentage },
      ]);
      setNewEducation({
        institute: "",
        course: "",
        year: "",
        percentage: "",
      });
    }
  };
  const addProject = () => {
    if (newProject.trim() !== "") {
      setProjects([...projects, newProject]);
      setNewProject("");
    }
  };
  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const removeExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  const removeAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
  };

  const removeEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };
  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };
  const downloadPDF = () => {
    const doc = new jsPDF();
    const lineHeight = 10;
    const pageWidth = doc.internal.pageSize.width; // Get page width
    const pageHeight = doc.internal.pageSize.height; // Get page height
    const margin = 10; // Add margin
    let y = margin;
  
    const drawDottedLine = (startX, startY, endX, endY) => {
      doc.setLineDashPattern([1, 2], 0); // Dotted pattern: 1-unit dash, 2-unit space
      doc.line(startX, startY, endX, endY);
      doc.setLineDashPattern([], 0); // Reset to solid line for other elements
    };
    const addText = (text, x, y, maxWidth) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin; // Reset vertical position
        }
        doc.text(text, x, y, { maxWidth });
        return y + lineHeight;
      };
    
      const addWrappedText = (text, x, y, maxWidth) => {
        const splitText = doc.splitTextToSize(text, maxWidth);
        splitText.forEach((line) => {
          if (y + lineHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, x, y);
          y += lineHeight;
        });
        return y;
      };
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Resume", pageWidth / 2, y, { align: "center" });
    y += lineHeight * 2;
    drawDottedLine(margin, y - 5, pageWidth - margin, y - 5);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${personalInfo.name || "N/A"}`, 10, y);
    y += lineHeight;
    doc.text(`Email: ${personalInfo.email || "N/A"}`, 10, y);
    y += lineHeight;
    doc.text(`Phone: ${personalInfo.phone || "N/A"}`, 10, y);
    y += lineHeight;
    doc.text(`Portfolio URL: ${personalInfo.url || "N/A"}`, 10, y);
    y += lineHeight;
    doc.text(`About: ${personalInfo.about || "N/A"}`, 10, y , {maxWidth: 180});
    y += lineHeight*2;
  
    // Add Skills Section if Data Exists
    if (skills.length > 0) {
        drawDottedLine(margin, y - 5, pageWidth - margin, y - 5); // Add dotted line
      y += lineHeight;
  
      doc.setFont("helvetica", "bold");
    y = addText("Skills:", margin, y, pageWidth - 2 * margin);
    doc.setFont("helvetica", "normal");
  
    skills.forEach((skill) => {
        y = addText(`- ${skill}`, margin + 5, y, pageWidth - 2 * margin);
      });
    }
  
    // Add Experience Section if Data Exists
    if (experience.length > 0) {
        drawDottedLine(margin, y - 5, pageWidth - margin, y - 5);
        y += lineHeight;
        doc.setFont("helvetica", "bold");
        y = addText("Experience:", margin, y, pageWidth - 2 * margin);
        doc.setFont("helvetica", "normal");
        experience.forEach((exp) => {
          y = addWrappedText(`- ${exp}`, margin + 5, y, pageWidth - 2 * margin);
        });
    }
  
    // Add Achievements Section if Data Exists
    if (achievements.length > 0) {
        drawDottedLine(margin, y - 5, pageWidth - margin, y - 5);
        y += lineHeight;
        doc.setFont("helvetica", "bold");
        y = addText("Achievements:", margin, y, pageWidth - 2 * margin);
        doc.setFont("helvetica", "normal");
        achievements.forEach((achievement) => {
          y = addWrappedText(`- ${achievement}`, margin + 5, y, pageWidth - 2 * margin);
        });
    }
  
    // Add Education Section if Data Exists
    if (education.length > 0) {
        drawDottedLine(margin, y - 5, pageWidth - margin, y - 5);
        y += lineHeight;
        doc.setFont("helvetica", "bold");
        y = addText("Education:", margin, y, pageWidth - 2 * margin);
        doc.setFont("helvetica", "normal");
        education.forEach((edu) => {
          const educationText = `Institute: ${edu.institute}, Course: ${edu.course}, Year: ${edu.year}, Percentage: ${edu.percentage}`;
          y = addWrappedText(educationText, margin + 5, y, pageWidth - 2 * margin);
        });
    }
    if (projects.length > 0) {
        drawDottedLine(10, y - 5, 200, y - 5); // Add dotted line
        y += lineHeight;
  
        doc.setFont("helvetica", "bold");
        y = addText("Projects:", margin, y, pageWidth - 2 * margin);
        doc.setFont("helvetica", "normal");
        projects.forEach((project) => {
          y = addWrappedText(`- ${project}`, margin + 5, y, pageWidth - 2 * margin);
        });
      }
    // Save the PDF
    doc.save(`${personalInfo.name || "Resume"}.pdf`);
  };
  

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "5px",
  };

  const resumePreviewStyle = {
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  };

  const sectionTitleStyle = {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      {/* Form Section */}
      <div style={{ flex: 1 }}>
        <h2>Resume Builder</h2>
        <h3>Personal Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={personalInfo.name}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={personalInfo.email}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={personalInfo.phone}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          type="url"
          name="url"
          placeholder="Portfolio URL or GitHub url"
          value={personalInfo.url}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <textarea
          name="about"
          placeholder="Tell us about yourself"
          value={personalInfo.about}
          onChange={handleInputChange}
          style={{ ...inputStyle, height: "80px" }}
        ></textarea>
        

        <h3>Skills</h3>
        <input
          type="text"
          placeholder="Add a skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addSkill} style={buttonStyle}>
          Add Skill
        </button>
        {skills.length > 0 && (
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>
                {skill}{" "}
                <button onClick={() => removeSkill(index)} style={buttonStyle}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <h3>Experience</h3>
        <textarea
          placeholder="Add an experience"
          value={newExperience}
          onChange={(e) => setNewExperience(e.target.value)}
          style={{ ...inputStyle, height: "60px" }}
        ></textarea>
        <button onClick={addExperience} style={buttonStyle}>
          Add Experience
        </button>
        {experience.length > 0 && (
          <ul>
            {experience.map((exp, index) => (
              <li key={index}>
                {exp}{" "}
                <button onClick={() => removeExperience(index)} style={buttonStyle}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <h3>Achievements</h3>
        <textarea
          placeholder="Add an achievement"
          value={newAchievement}
          onChange={(e) => setNewAchievement(e.target.value)}
          style={{ ...inputStyle, height: "60px" }}
        ></textarea>
        <button onClick={addAchievement} style={buttonStyle}>
          Add Achievement
        </button>
        {achievements.length > 0 && (
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index}>
                {achievement}{" "}
                <button onClick={() => removeAchievement(index)} style={buttonStyle}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3>Projects</h3>
        <textarea
          placeholder="Add a project"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          style={{ ...inputStyle, height: "60px" }}
        />
        <button onClick={addProject} style={buttonStyle}>
            Add Project
        </button>
        {projects.length > 0 && (
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                {project}{" "}
                <button onClick={() => removeProject(index)} style={buttonStyle}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3>Education</h3>
        <input
          type="text"
          name="institute"
          placeholder="Institute"
          value={newEducation.institute}
          onChange={handleEducationChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={newEducation.course}
          onChange={handleEducationChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={newEducation.year}
          onChange={handleEducationChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="percentage"
          placeholder="Percentage"
          value={newEducation.percentage}
          onChange={handleEducationChange}
          style={inputStyle}
        />
        <button onClick={addEducation} style={buttonStyle}>
          Add Education
        </button>
        {education.length > 0 && (
          <ul>
            {education.map((edu, index) => (
              <li key={index}>
                <strong>Institute:</strong> {edu.institute}, <strong>Course:</strong>{" "}
                {edu.course}, <strong>Year:</strong> {edu.year}, <strong>Percentage:</strong> {edu.percentage}{" "}
                <button onClick={() => removeEducation(index)} style={buttonStyle}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => setShowPreview(!showPreview)}
          style={{ ...buttonStyle, marginTop: "20px" }}
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      {/* Resume Preview Section */}
      {showPreview && (
        <div style={resumePreviewStyle}>
          <h2>Resume Preview</h2>
          <h3 style={sectionTitleStyle}>{personalInfo.name || "Your Name"}</h3>
          <p>Email: {personalInfo.email || "Your Email"}</p>
          <p>Phone: {personalInfo.phone || "Your Phone"}</p>
          <p>Portfolio URL: {personalInfo.url || "Your Portfolio URL"}</p>
          <p>About: {personalInfo.about || "Your About Section"}</p>
          <h4 style={sectionTitleStyle}>Skills</h4>
          <ul>
            {skills.length > 0 ? (
              skills.map((skill, i) => <li key={i}>{skill}</li>)
            ) : (
              <p>No skills added.</p>
            )}
          </ul>

          <h4 style={sectionTitleStyle}>Experience</h4>
          <ul>
            {experience.length > 0 ? (
              experience.map((exp, i) => <li key={i}>{exp}</li>)
            ) : (
              <p>No experience added.</p>
            )}
          </ul>

          <h4 style={sectionTitleStyle}>Achievements</h4>
          <ul>
            {achievements.length > 0 ? (
              achievements.map((ach, i) => <li key={i}>{ach}</li>)
            ) : (
              <p>No achievements added.</p>
            )}
          </ul>

          <h4 style={sectionTitleStyle}>Projects</h4>
          <ul>
            {projects.length > 0 ? (
              projects.map((pro, i) => <li key={i}>{pro}</li>)
            ) : (
              <p>No Projects added.</p>
            )}
          </ul>
          <h4 style={sectionTitleStyle}>Education</h4>
          <ul>
            {education.length > 0 ? (
              education.map((edu, i) => (
                <li key={i}>
                  <strong>Institute:</strong> {edu.institute}, <strong>Course:</strong>{" "}
                  {edu.course}, <strong>Year:</strong> {edu.year}, <strong>Percentage:</strong> {edu.percentage}
                </li>
              ))
            ) : (
              <p>No education added.</p>
            )}
          </ul>

          <button
            onClick={downloadPDF}
            style={{ ...buttonStyle, marginTop: "20px" }}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
