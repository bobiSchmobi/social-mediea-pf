// Load data when the page is ready
document.addEventListener("DOMContentLoaded", loadStudentTable);

async function loadStudentTable() {
  // Fetch data from the endpoint
  try {
    const response = await fetch("http://localhost:3000/students");
    const listOfStudents = await response.json();

    populateStudentTable(listOfStudents);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateStudentTable(students) {
  // Get the table body
  var tableBody = document.querySelector("#studentTable tbody");

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Iterate through the data and add rows to the table
  students.forEach((student) => {
    var row = tableBody.insertRow();
    row.insertCell(0).textContent = student.id;
    row.insertCell(1).textContent = student.name;
    row.insertCell(2).textContent = student.age;
    row.insertCell(3).textContent = student.topics.join(", ");
    row.insertCell(4).innerHTML =
      '<button class="edit-btn" onclick="editUser(' +
      student.id +
      ')">Edit</button>';
    row.insertCell(5).innerHTML =
      '<button class="remove-btn" onclick="removeUser(' +
      student.id +
      ')">Remove</button>';
  });
}



async function addOrUpdateStudent() {
  // Read existing student data from the server
  const response = await fetch("http://localhost:3000/students");
  const listOfStudents = await response.json();

  // Extract values from the HTML form
  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value, 10);
  const topics = document.getElementById("topics").value.split(",").map((topic) => topic.trim());

  // Check if there's a hidden input with studentId
  let studentIdInput = document.getElementById("studentId");

  if (studentIdInput) {
    // If there's a hidden input, it means it's an edit operation
    const studentId = parseInt(studentIdInput.value, 10);
    const existingStudentIndex = listOfStudents.findIndex((student) => student.id === studentId);

    if (existingStudentIndex !== -1) {
      // Update the existing student with new data
      listOfStudents[existingStudentIndex].name = name;
      listOfStudents[existingStudentIndex].age = age;
      listOfStudents[existingStudentIndex].topics = topics;

      // Use PUT request for updating
      await fetch(`http://localhost:3000/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listOfStudents[existingStudentIndex]),
      });
    }

    // Remove the hidden input for studentId after the operation
    studentIdInput.remove();
  } else {
    // If there's no hidden input, it means it's an add operation
    // Find the highest ID
    const highestId = listOfStudents.reduce((max, student) => (student.id > max ? student.id : max), 0);

    // Create a new student object with the next ID
    const newStudent = {
      id: highestId + 1,
      name,
      age,
      topics,
    };

    // Use POST request for adding
    await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });
  }

  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("topics").value = "";

  // Refresh the table
  loadStudentTable();
}






async function editUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/students/`);
    
    if (!response.ok) {
      throw new Error(`Error fetching student data: ${response.statusText}`);
    }

    const students = await response.json();
    const studentData = students.find(student => student.id === userId);

    if (!studentData) {
      throw new Error(`Student with ID ${userId} not found`);
    }

    // Fill the form fields with the retrieved data
    document.getElementById("name").value = studentData.name;
    document.getElementById("age").value = studentData.age;
    document.getElementById("topics").value = studentData.topics.join(", ");

    // Create or update the hidden input for student ID
    let idInput = document.getElementById("studentId");
    if (!idInput) {
      idInput = document.createElement("input");
      idInput.type = "hidden";
      idInput.name = "id";
      idInput.id = "studentId";
      document.querySelector(".add-update-form").appendChild(idInput);
    }
    idInput.value = userId;

    // Update the form submit button to handle both add and update
    const submitButton = document.querySelector(".edit-btn");
    submitButton.innerText = "Update";
    submitButton.onclick = addOrUpdateStudent;
  } catch (error) {
    console.error(error.message);
  }
}





async function removeUser(userId) {
  // Confirm the deletion with the user
  const confirmDelete = confirm("Are you sure you want to remove student " + userId + "?");

  if (confirmDelete) {
    // Make a DELETE request to the server
    const response = await fetch(`http://localhost:3000/students/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // If the deletion is successful, reload the table
      loadStudentTable();
    } else {
      // If there's an error, log it to the console
      console.error("Error deleting student:", response.statusText);
    }
  }
}


