const sort = document.querySelector('.sort');
const tbody = document.getElementById('tbody');

function sorting() {
  for (const iterator of tbody.children) {
    tbody.prepend(iterator);
  }
  sort.classList.toggle('down');
}

sort.addEventListener('click', sorting);
