 (async () => {
    const res = await fetch('/personalOS/profile/data');
    const data = await res.json();
    if(data.success){
      document.getElementById('name_val').textContent = data.name || '---';
    document.getElementById('username_val').textContent = data.username || '---';
    document.getElementById('email_val').textContent = data.email || '---';
    document.getElementById('bio_val').textContent = data.bio || 'No bio set';
    console.log("databio",data.bio);
    document.getElementById('phone_val').textContent = data.phonenumber || 'Not linked';
    document.getElementById('timezone_val').textContent = data.timezone || 'UTC +0:00';

    document.getElementById('hero_name').textContent = data.name || 'User';
    document.getElementById('hero_username').textContent = '@' + (data.username || 'username');
      const avatar = document.getElementById('avatar_letter').textContent =
  data.name ? data.name.charAt(0).toUpperCase() : '?';

    }
  })();
  const editBtn = document.querySelector('.edit-btn');
const fields = [
  'name_val',
  'username_val',
  'bio_val',
  'timezone_val'
];

let editing = false;

editBtn.addEventListener('click', () => {
  editing = !editing;

  if (editing) {
    // EDIT MODE
    editBtn.textContent = 'Save Changes';
    editBtn.classList.replace('edit-btn', 'save-btn');

    fields.forEach(id => {
      const box = document.getElementById(id);
      const value = box.textContent.trim();
      box.innerHTML = `<input type="text" class="edit-input" value="${value === '---' || value === 'Not linked' ? '' : value}">`;
    });

  } else {
  editBtn.textContent = 'Edit Profile';
  editBtn.classList.replace('save-btn', 'edit-btn');

  const payload = {};

  fields.forEach(id => {
    const box = document.getElementById(id);
    const input = box.querySelector('input');
    payload[id.replace('_val', '')] = input.value.trim();
  });

  fetch('/personalOS/profile/updatedata', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) return;

    // 👇 THIS IS WHAT YOU ASKED
    document.querySelector('#name_val').textContent = data.name;
    document.querySelector('#username_val').textContent = data.username;
    document.querySelector('#email_val').textContent = data.email;
    document.querySelector('#bio_val').textContent = data.bio || 'No bio set';
    document.querySelector('#phone_val').textContent = data.phone || 'Not linked';
    document.querySelector('#timezone_val').textContent = data.timezone;

    document.querySelector('#hero_name').textContent = data.name;
    document.querySelector('#hero_username').textContent = '@' + data.username;
    document.querySelector('#avatar_letter').textContent =
      data.name.charAt(0).toUpperCase();
  })
  .catch(err => {
    console.error(err);
  });
}

});
