function submitBothForms() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const connections= document.getElementById('connections').value;

  const data = {
    title: title,
    connections: connections,
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