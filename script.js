const getUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=2');
      const users = response.data.data;
      displayUsers(users);
    } catch (error) {
      console.error(error);
    }
  }
  
  const displayUsers = (users) => {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
      const userElement = document.createElement('li');
      userElement.textContent = `${user.first_name} ${user.last_name}`;
      userElement.setAttribute('data-id', user.id);
  
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'delete-icon fas fa-trash-alt';
      deleteIcon.addEventListener('click', () => deleteUser(user.id));
  
      const editIcon = document.createElement('i');
      editIcon.className = 'edit-icon fas fa-edit';
      editIcon.addEventListener('click', () => editUser(user));
  
      userElement.appendChild(deleteIcon);
      userElement.appendChild(editIcon);
      userList.appendChild(userElement);
    });
  }
  
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      console.log(`User ${userId} deleted`);
  
      const userElement = document.querySelector(`li[data-id="${userId}"]`);
      if (userElement) {
        userElement.remove();
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const editUser = (user) => {
    const editForm = document.getElementById('editForm');
    editForm.style.display = 'block';
    
    const firstNameInput = document.getElementById('firstName');
    firstNameInput.value = user.first_name;
    
    const lastNameInput = document.getElementById('lastName');
    lastNameInput.value = user.last_name;
    
    const userIdInput = document.getElementById('userId');
    userIdInput.value = user.id;
  }
  
  document.getElementById('editForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    
    const userIdInput = document.getElementById('userId');
    
    try {
      await axios.put(`https://reqres.in/api/users/${userIdInput.value}`, {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value
      });
      
      console.log(`User ${userIdInput.value} updated`);
      
      getUsers();
      
      firstNameInput.value = '';
      lastNameInput.value = '';
      
      userIdInput.value = '';
      
      event.target.style.display = 'none';
      
    } catch (error) {
      console.error(error);
    }
  });
  
  getUsers();
  