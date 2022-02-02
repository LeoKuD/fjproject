const testThemeSelect = document.getElementById('testThemeSelect');

testThemeSelect.addEventListener('change', ({ target }) => {
    const value = target.querySelector('option:checked').textContent;
    updateCurrentThemeData(value);
})

async function updateCurrentThemeData(themeName) {
    const formData = new FormData();
    formData.append('theme', themeName);
    const response = await fetch('YOUR_URL', {
        method: 'POST',
        body: formData,
      });
  
    const result = await response.json();
    console.log(result)
}