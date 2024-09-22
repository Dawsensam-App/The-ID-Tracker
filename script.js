// Object to store student ID and its count
let studentData = {};

// Load data from localStorage when the page is loaded
window.onload = function() {
    loadDataFromLocalStorage();
    updateTable();
};

// Function to track how many times an ID is entered
function trackID() {
    const studentID = document.getElementById("studentID").value.trim();
    const warningMessage = document.getElementById("warningMessage");

    if (studentID === "") {
        alert("Please enter a valid Student ID");
        return;
    }

    if (studentData[studentID]) {
        studentData[studentID] += 1;
    } else {
        studentData[studentID] = 1;
    }

    // Check if the student ID has been entered 3 times
    if (studentData[studentID] % 3 === 0) {
        warningMessage.textContent = `Warning: Student ID ${studentID} has been entered ${studentData[studentID]} times. This student needs to see an administrator.`;
        warningMessage.style.display = "block";
    } else {
        warningMessage.style.display = "none"; // Hide the message for other counts
    }

    // Save updated data to localStorage
    saveDataToLocalStorage();

    updateTable();
    document.getElementById("studentID").value = ""; // Clear input field
}

// Update the results table with the latest counts
function updateTable() {
    const resultBody = document.getElementById("resultBody");
    resultBody.innerHTML = ""; // Clear existing rows

    for (const id in studentData) {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = id;
        row.appendChild(idCell);

        const countCell = document.createElement("td");
        countCell.textContent = studentData[id];
        row.appendChild(countCell);

        resultBody.appendChild(row);
    }
}

// Print the report
function printReport() {
    let reportContent = "Lake Worth High School\nStudent ID Tracking Report\n\n";
    reportContent += "Student ID\t\tCount\n";

    for (const id in studentData) {
        reportContent += `${id}\t\t${studentData[id]}\n`;
    }

    const printWindow = window.open('', '_blank', 'width=600,height=400');
    printWindow.document.write('<pre>' + reportContent + '</pre>');
    printWindow.document.close();
    printWindow.print();
}

// Save the report as a CSV file
function saveAsCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Student ID,Count\n";

    for (const id in studentData) {
        csvContent += `${id},${studentData[id]}\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_id_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Save student data to localStorage
function saveDataToLocalStorage() {
    localStorage.setItem('studentData', JSON.stringify(studentData));
}

// Load student data from localStorage
function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('studentData');
    if (savedData) {
        studentData = JSON.parse(savedData);
    }
}

// Function to search for a specific Student ID
function searchID() {
    const searchValue = document.getElementById("searchID").value.trim().toLowerCase();
    const resultBody = document.getElementById("resultBody");

    resultBody.innerHTML = ""; // Clear the table

    for (const id in studentData) {
        if (id.toLowerCase().includes(searchValue)) {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = id;
            row.appendChild(idCell);

            const countCell = document.createElement("td");
            countCell.textContent = studentData[id];
            row.appendChild(countCell);

            resultBody.appendChild(row);
        }
    }
}
