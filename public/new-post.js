function submitBothForms() {
  // Submit the forms by triggering their submit action
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const data = {
    title: title,
    content: content,
  }

  fetch('/submitNewPost',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error=> {
    console.error('ERROR:', error);
  });
}