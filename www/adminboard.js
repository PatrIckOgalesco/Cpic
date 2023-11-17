
const table = document.querySelector('table');
const questionInputs = document.querySelectorAll('.question-input');
const answerInputs = document.querySelectorAll('.answer-input');
const editButtons = document.querySelectorAll('.edit-button');
const deleteButtons = document.querySelectorAll('.delete-button');
const saveButtons = document.querySelectorAll('.save-button');
const addRowButton = document.querySelector('.add-row-button');

const data = [];

// Function to update the table rows
function updateTable() {
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach((item, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="file"></td>
      <td><input type="text" class="question-input" value="${item.question}"></td>
      <td><input type="text" class="answer-input" value="${item.answer}"></td>
      <td>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
        <button class="save-button">Save</button>
      </td>
    `;

    tbody.appendChild(newRow);
  });

  bindRowEvents();
}

// Function to bind events for each row
function bindRowEvents() {
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach((row, index) => {
    editButtons[index].addEventListener('click', () => {
      questionInputs[index].removeAttribute('readonly');
      answerInputs[index].removeAttribute('readonly');
    });

    deleteButtons[index].addEventListener('click', () => {
      data.splice(index, 1);
      updateTable();
    });

    saveButtons[index].addEventListener('click', () => {
      const question = questionInputs[index].value;
      const answer = answerInputs[index].value;

      if (question && answer) {
        data[index].question = question;
        data[index].answer = answer;
        questionInputs[index].setAttribute('readonly', 'true');
        answerInputs[index].setAttribute('readonly', 'true');
      }
    });
  });
}

// Add a new row
addRowButton.addEventListener('click', () => {
  data.push({ question: '', answer: '' });
  updateTable();
});

// Initial setup
updateTable();





function addNewRow() {
    const image = document.getElementById('image1').value; // Get image input value
    const question = document.getElementById('question1').value; // Get question input value
    const answer = document.getElementById('answer1').value; // Get answer input value

    // Make an AJAX request using the fetch API
    fetch('add_row.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `image=${encodeURIComponent(image)}&question=${encodeURIComponent(question)}&answer=${encodeURIComponent(answer)}`,
    })
      .then(response => response.json()) // Assuming the server returns JSON
      .then(data => {
        // Handle the response data (e.g., update the table)
        console.log(data);
      })
      .catch(error => {
        console.error('Error adding new row:', error);
      });
  }