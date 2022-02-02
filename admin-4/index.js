const tests = document.querySelector('.tests');


tests.addEventListener('click', ({ target }) => {
    target.closest('.test-text').setAttribute( 'contenteditable',"true");
    target.closest('.tests__item').classList.add('edit');
})


const obj = {
    name1: 'jkjfddjkdsfjjfkjdsf',
    name2: 'kfdsjdsfjkkj',
}

const activateAddTestButton = document.getElementById('activateAddTestButton');
const addTestForm = document.getElementById('addTestForm');

activateAddTestButton.addEventListener('click', () => {
    addTestForm.classList.toggle('active');
})