const testThemeSelect = document.getElementById('testThemeSelect');
const testSelect = document.getElementById('testSelect');
const testDescription = document.getElementById('testDescription');
const startTestButton = document.getElementById('startTestButton');

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

    const result = [{name: "Second test", description: "DescTest2"}, {name: "TherdNameTest", description: "DescT3"}];
    
    updateTestsData(result);
}

function updateTestsData(data) {
    testsData = data;
    const selectInner = data.reduce((accum, { name }, index) => {
        return accum + `<option value='${name}' data-index=${index}>${name}</option>`;
    }, '');

    testSelect.innerHTML = selectInner;
    testSelect.closest('div').classList.remove('hidden');
    startTestButton.closest('div').classList.remove('hidden');
    updateDescription();
}

testSelect.addEventListener('change', updateDescription)

function updateDescription() {
    const testOptionIndex = testSelect.querySelector('option:checked').dataset.index;
    testDescription.innerHTML = testsData[Number(testOptionIndex)].description;
    testDescription.closest('div').classList.remove('hidden');
}


