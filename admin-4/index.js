let prevEditedTheme = null;
let prevEditedThemeValue = null;


document.addEventListener('click', ({ target }) => {
    const targetClassList = target.classList;
   if (target.closest('#testThemes')) {
    testThemeClichHandler(target)
   } else if(target.closest('#detailList')) {
    refreshThemesValues();
    detailClickHandler(target);
    
   }
   refreshThemesValues();
})

function testThemeClichHandler(target) {
    const testItem = target.closest('.test-item');
    if (testItem) {
        if (target.closest('.test-item__edit')) {
            setThemeEditMode(testItem)
        }
    }
}

function setThemeEditMode(newTheme) {
    if (prevEditedTheme) {
        prevEditedTheme.classList.remove('edit');
        prevEditedTheme.querySelector('.test-item__input').setAttribute('readonly', '');
        prevEditedTheme.querySelector('.test-item__input').value = prevEditedThemeValue;
    }
    prevEditedTheme = newTheme;

    if (newTheme) {
        newTheme.classList.add('edit');
        newTheme.querySelector('.test-item__input').removeAttribute('readonly');
        newTheme.querySelector('.test-item__input').focus();
        prevEditedThemeValue = newTheme.querySelector('.test-item__input').value;
    }
}

function refreshThemesValues() {
    setThemeEditMode(null);
    prevEditedThemeValue = null;
    
}

const prevQuestion = null;

function detailClickHandler(target) {
    if (target.closest('.question')) {
        console.log('Yes')
    }
}












const activateAddTestButton = document.getElementById('activateAddTestButton');
const addTestForm = document.getElementById('addTestForm');

activateAddTestButton.addEventListener('click', () => {
    addTestForm.classList.toggle('active');
})

const detailList = document.getElementById('detailList');

detailList.addEventListener('click', ({ target }) => {
    if (target.closest('.question')) {
        clickQuestionHandler(target);
    }
})

function clickQuestionHandler(target) {
    if(target.classList.contains('question__text')) {
        target.closest('.question').classList.toggle('open')
    }
}