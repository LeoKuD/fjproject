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

/* const userDeleteForm =  */
const usersList = document.querySelector('.users__list');
const openCreateModalButton = document.getElementById('openCreateModalButton');
const createUserModal = document.querySelector('.createUserModal__body');
const modalUserName = document.getElementById('modalUserName');
const modalUserSurname = document.getElementById('modalUserSurname');
const modalUserRole = document.getElementById('modalUserRole');
const modalUserRoleOptions = modalUserRole.innerHTML;
const modalUserLogin = document.getElementById('modalUserLogin');
const modalUserPasswordInput = document.getElementById('modalUserPassword');
const modalTitle = document.querySelector('.createUserModal__title');
const userDeleteForm = document.getElementById('userDeleteForm');
let editMode = false;
let hiddenInput = null;
let deletedUserId = null;

function getHiddenInput(id) {
    const label = document.createElement('label');
    label.innerHTML = `<input type="hidden" name="userId" value=${id} id="hiddenInput"/>`;
    hiddenInput = label;
    return label;
}

function setUserDataInForm({ userId, firstName, lastName, login, role: { rolesList, currentRole} }) {
    editMode = true;
    createUserModal.appendChild(getHiddenInput(userId));
    modalUserName.value = firstName;
    modalUserSurname.value = lastName;
    modalUserRole.innerHTML = rolesList.reduce( (accum, role) => {
        return accum += `<option ${role === currentRole ? 'selected' : ''}>${role}</option>`
    }, '');
    modalUserLogin.value = login;
    modalUserPasswordInput.removeAttribute('required');
    openCreateModalButton.click();
}

async function getEditUserData(userId) {
    /* const response = await fetch('Your url with user id');
    const result = await response.json();
    console.log(result) */
    setUserDataInForm(result)
}

usersList.addEventListener('click', ( { target }) => {
    if (target.closest('.user-info__button_edit')) {
        const userId = target.closest('.user-info').dataset.id;
        getEditUserData(userId);
    }
    if (target.closest('.user-info__button_delete')) {
        deletedUserId =  target.closest('.user-info').dataset.id;
    }
})

userDeleteForm.addEventListener('submit', () => {
    userDeleteForm.prepend(getHiddenInput(deletedUserId))
})

function refreshUserModal() {
    console.log('Refrexh')
    editMode = false;
    modalUserName.value = '';
    modalUserSurname.value = '';
    modalUserRole.innerHTML = modalUserRoleOptions;
    modalUserLogin.value = '';
    hiddenInput.remove();
    modalUserPasswordInput.setAttribute('required', '');
    editMode = false;
}

openCreateModalButton.addEventListener('click', ( { isTrusted} ) => {
    modalTitle.textContent = !isTrusted ? 'Edit user data' : 'Create new user';
    if (isTrusted && editMode) {
        refreshUserModal();
    }
})