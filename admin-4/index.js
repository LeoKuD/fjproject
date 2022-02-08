const dataByTopicId = 
[
  {
    "name": "Second test",
    "description": "DescTest2",
    "testId": 2,
    "questions": [
      {
        "questionId": 2,
        "description": "1st quest for test2"
      },
      {
        "questionId": 3,
        "description": "2st quest for test2"
      },
      {
        "questionId": 4,
        "description": "3d quest for test2"
      },
      {
        "questionId": 5,
        "description": "4d qyest for test2"
      },
      {
        "questionId": 6,
        "description": "5d quest for test2"
      }
    ]
  },
  {
    "name": "TherdNameTest",
    "description": "DescT3",
    "testId": 19,
    "questions": [
      
    ]
  }
];

const questionData = {
    "questionId": 2,
    "description": "1st quest for test2",
    "answerDTOList": [
      {
        "answerId": 1,
        "description": "1AnswFor2",
        "correct": false
      },
      {
        "answerId": 2,
        "description": "2AnswFor2",
        "correct": true
      },
      {
        "answerId": 3,
        "description": "3AnsFor2",
        "correct": false
      }
    ]
};




function getQuestionHtml({ name, description, testId, questions }) {
  const question = document.createElement('div');
  question.className = 'question';
  question.dataset.id = testId;
  question.innerHTML = `
    <div class="row">
      <a class="col question__text" data-bs-toggle="collapse" href='#test${testId}' role="button" aria-expanded="false" aria-controls="collapseExample">
        ${name}
      </a>
      <button class="col-auto question__add-button" data-bs-toggle="modal" data-bs-target="#questionModal"><img src="./img/add-icon.svg" alt="Edit test question"></button>
      <div class="col-auto question__control">
        <button><img src="./img/edit-icon.svg" alt="Edit test question"></button>
        <button><img src="./img/delete-icon.svg" alt="Delete test question"></button>
      </div>
    </div>
    <div class="collapse question__list" id=test${testId}>
      ${
        questions.reduce( (accum, { questionId, description }, index) => {
          return accum += (`
            <div class="row align-items-center question__item" data-id=${questionId}>
              <span class="col-auto">${index + 1}</span>
              <textarea class="col form-input" type="text" readonly="">
                ${description}
              </textarea>
              <div class="col-auto question-control">
                <button class='question__edit-button' data-bs-toggle="modal" data-bs-target="#questionModal"><img src="./img/edit-icon.svg" alt="Edit test question"></button>
                <button class='question__delete-button'><img src="./img/delete-icon.svg" alt="Delete test question"></button>
              </div>
            </div>
          `)
        }, '')
      }
    </div>
  `
  return question
}


const detailList = document.getElementById('detailList');
const addThemeForm = document.getElementById('addThemeForm');
const addThemeFormInput = document.querySelector('.add-theme-form__input');
let prevEditedTheme = null;
let prevEditedThemeValue = null;
let currentThemeId = null;

function changeActiveAddThemeFormStatus() {
  addThemeForm.classList.toggle('active');
}

function addThemeClickHandler(target) {
 if (target.closest('.sidebar-add-theme__button')) {
  changeActiveAddThemeFormStatus();
 }
}

function deactivateAddThemeForm() {
  addThemeForm.reset();
  addThemeForm.classList.remove('active');
}

let result = null;

async function getTestsData(themeId) {
 // const response = await fetch(/* 'Your url' */);
  //result = await response.json();
  result = dataByTopicId;

  return result;
}

async function setNewThemeTests(themeId) {
  const testsData = await getTestsData(themeId);
  detailList.innerHTML = '';
  testsData.forEach( testData => {
    detailList.appendChild(getQuestionHtml(testData))
  })
}

function testThemeClichHandler(target) {
  const testItem = target.closest('.theme-item');
  if (testItem) {
    const themeId = testItem.dataset.id;
    if (target.closest('.theme-item__input')) {
      if (themeId !== currentThemeId) {
        setNewThemeTests(themeId);
      }
    }
    if (target.closest('.theme-item__edit')) {
      setThemeEditMode(testItem)
    }
  }
}

document.addEventListener('click', ({ target }) => {
  const targetClassList = target.classList;
  if (target.closest('#testThemes')) {
   testThemeClichHandler(target);
   deactivateAddThemeForm();
  } else if (target.closest('.sidebar-add-theme')) {
    addThemeClickHandler(target);
  } 
  else if(target.closest('#detailList')) {
   refreshThemesValues();
   detailClickHandler(target);
   deactivateAddThemeForm();
  }
  /* refreshThemesValues(); */
})




function setThemeEditMode(newTheme) {
  if (prevEditedTheme) {
    prevEditedTheme.classList.remove('edit');
    prevEditedTheme.querySelector('.theme-item__input').setAttribute('readonly', '');
    prevEditedTheme.querySelector('.theme-item__input').value = prevEditedThemeValue;
  }
  prevEditedTheme = newTheme;
  if (newTheme) {
    newTheme.classList.add('edit');
    newTheme.querySelector('.theme-item__input').removeAttribute('readonly');
    newTheme.querySelector('.theme-item__input').focus();
    prevEditedThemeValue = newTheme.querySelector('.theme-item__input').value;
  }
}

function refreshThemesValues() {
  setThemeEditMode(null);
  prevEditedThemeValue = null;
}

let prevQuestion = null;
const questionFormQuestion = document.getElementById('questionFormQuestion');
const activateAddTestButton = document.getElementById('activateAddTestButton');
const addTestForm = document.getElementById('addTestForm');
const addAnswerButton = document.getElementById('addAnswerButton');
const createQuestionForm = document.getElementById('createQuestionForm');
const questionFormAnswerField = document.getElementById('questionFormAnswerField');
console.log(questionFormAnswerField)
/* activateAddTestButton.addEventListener('click', () => {
    addTestForm.classList.toggle('active');
}) */

function refreshQuestionForm() {
  questionFormQuestion.textContent = '';
  questionFormAnswerField.textContent = '';
}

function openQuestionCreateForm() {
  refreshQuestionForm();
}

function openQuestionEditForm( { questionId, description, answerDTOList }) {
  refreshQuestionForm();
  questionFormQuestion.textContent = description;
  answerDTOList.forEach( itemData => {
    questionFormAnswerField.append((getNewAnswerField(itemData)));
  })
}

async function editQuestion(id) {
  /* const response = await fetch()
  const questionData = await response.json(); */
  openQuestionEditForm(questionData);
}

function detailClickHandler(target) {
  const question = target.closest('.question');
  if (question) {
    const questionId = question.dataset.id;
    if (target.closest('.question__edit-button')) {
      editQuestion(questionId)
    } else if (target.closest('.question__delete-button')) {
      console.log('delete')
    }
  }
}

function getNewAnswerField(data) {
  const nextAnswerNumber = questionFormAnswerField.childNodes.length;
  const answer = document.createElement('label');
  answer.className = 'answer';
  const description = data ? data.description : '';
  const correct = data ? data.correct : false;
  answer.innerHTML = `
    <div class="row align-items-center">
      <div class="col-auto answer__title">Answer ${nextAnswerNumber + 1}</div>
      <input class="col-auto" type="checkbox" ${correct ? 'checked' : ''}>
    </div>
    <div class="row align-items-center">
      <input class="col form-input" type="text" value="${description}" placeholder="write answer"  required>
      <button class="col-auto answer__delete-button" type="button"><img src="./img/delete-icon.svg"></button>
    </div>

  `;

  return answer;
}

function createNewQuestion() {
  questionFormAnswerField.append(getNewAnswerField());
}

createQuestionForm.addEventListener('click', ({ target }) => {
  if (target.closest('.add-answer-button')) {
    createNewQuestion()
  } else if (target.closest('.answer__delete-button')) {
    target.closest('.answer').remove();
  }
})


function clickQuestionHandler(target) {
  if(target.classList.contains('question__text')) {
    target.closest('.question').classList.toggle('open');
  } else if (target.closest('.question__add-button')) {
    openQuestionCreateForm();
  } 
}

detailList.addEventListener('click', ({ target }) => {
  if (target.closest('.question')) {
    clickQuestionHandler(target);
  }
})


