``javascript
function gerarDat() {
  const quantidade = document.getElementById('quantidade').value;

  fetch('/gerar-contas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quantidade })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao gerar contas');
    }
    return response.blob();
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contas.dat';
    document.body.appendChild(a);
    a.click();
    a.remove();
  })
  .catch(error => {
    alert(error.message);
  });
}