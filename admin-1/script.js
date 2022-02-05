const result = {
    "userId": 2,
    "firstName": "Ivand",
    "lastName": "Ivanov",
    "login": "admin",
    "role": {
      "rolesList": [
        "admin",
        "user"
      ],
      "currentRole": "admin"
    }
  };


const usersList = document.querySelector('.users__list');
const openCreateModalButton = document.getElementById('openCreateModalButton');
const createUserModal = document.querySelector('.createUserModal__body');
const modalUserName = document.getElementById('modalUserName');
const modalUserSurname = document.getElementById('modalUserSurname');
const modalUserRole = document.getElementById('modalUserRole');
const modalUserRoleOptions = modalUserRole.innerHTML;
const modalUserLogin = document.getElementById('modalUserLogin');
const modalUserPasswordLabel = document.getElementById('modalUserPasswordLabel');
const modalTitle = document.querySelector('.createUserModal__title');
let editMode = false;
let hiddenInput = null;

function getHiddenInput(id) {
    const label = document.createElement('label');
    label.innerHTML = `<input type="hidden"  value=${id} id="hiddenInput"/>`;
    hiddenInput = label;
    return label;
}

function setUserDataInForm({ userId, firstName, lastName, login, role: { rolesList, currentRole} }) {
    editMode = true;
    createUserModal.appendChild(getHiddenInput(userId))
    modalUserName.value = firstName;
    modalUserSurname.value = lastName;
    modalUserRole.innerHTML = rolesList.reduce( (accum, role) => {
        return accum += `<option ${role === currentRole ? 'selected' : ''}>${role}</option>`
    }, '');
    modalUserLogin.value = login;
    modalUserPasswordLabel.remove();
    openCreateModalButton.click();
}

async function getEditUserData(userId) {
    /* const response = await fetch('Your url with user id');
    const result = response.json(); */
    setUserDataInForm(result)
}

usersList.addEventListener('click', ( { target }) => {
    if (target.closest('.user-info__button')) {
        const userId = target.closest('.user-info').dataset.id;
        getEditUserData(userId);
    }
})

function refreshUserModal() {
    editMode = false;
    modalUserName.value = '';
    modalUserSurname.value = '';
    modalUserRole.innerHTML = modalUserRoleOptions;
    modalUserLogin.value = '';
    createUserModal.insertBefore(modalUserPasswordLabel, modalUserLogin.closest('label').nextElementSibling);
    hiddenInput.remove();
    editMode = false;
}

openCreateModalButton.addEventListener('click', ( { isTrusted} ) => {
    modalTitle.textContent = !isTrusted ? 'Edit user data' : 'Create new user';
    if (isTrusted && editMode) {
        refreshUserModal();
    }
})