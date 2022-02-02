const testThemeSelect = document.getElementById('testThemeSelect');
const testSelect = document.getElementById('testSelect');
const testDescription = document.getElementById('testDescription');
const startTestButton = document.querySelector('startTestButton');
let testsData = null;

testThemeSelect.addEventListener('change', ({ target }) => {
    const value = target.querySelector('option:checked').textContent;
    updateCurrentThemeData(value);
})

async function updateCurrentThemeData(themeName) {
    const formData = new FormData();
    formData.append('theme', themeName);
    const response = await fetch('http://127.0.0.1:5500/for-java-project/user1/index.html', {
        method: 'POST',
        body: formData,
      });
      
    const result = await response.json();
    
    updateTestsData(result)
}

function updateTestsData(data) {
    testsData = data;
    const selectInner = data.reduce((accum, { name }, index) => {
        return accum + `<option value='${index}'>${name}</option>`;
    }, '');

    testSelect.innerHTML = selectInner;
    testSelect.classList.toggle('.hidden');
    updateDescription();
}

testSelect.addEventListener('change', updateDescription)

function updateDescription() {
    const testOptionValue = testSelect.value;
    testDescription.innerHTML = testsData[Number(testOptionValue)].description;
    testDescription.classList.toggle('.hidden');
}
