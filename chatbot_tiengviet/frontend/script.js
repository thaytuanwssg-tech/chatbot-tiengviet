async function send(){
  const message = document.getElementById('input').value;
  const res = await fetch('/api/chat', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({mode:'dat-cau', message})
  });
  const data = await res.json();
  document.getElementById('output').textContent = data.reply;
}
