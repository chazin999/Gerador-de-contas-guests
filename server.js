``const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname))); // Para servir arquivos estáticos como HTML e CSS

app.post('/gerar-contas', (req, res) => {
  const { quantidade } = req.body;

  if (!quantidade || quantidade < 1 || quantidade > 100) {
    return res.status(400).json({ error: 'Quantidade inválida. Deve ser entre 1 e 100.' });
  }

  const contas = [];
  for (let i = 0; i < quantidade; i++) {
    contas.push(`conta${i + 1}@exemplo.com`);
  }

  const filePath = path.join(__dirname, 'contas.dat');
  
  fs.writeFile(filePath, contas.join('\n'), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao gerar o arquivo.' });
    }
    
    res.download(filePath, 'contas.dat', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao baixar o arquivo.' });
      }
      
      // Opcional: Deletar o arquivo após o download
      fs.unlink(filePath, (err) => {
        if (err) console.error('Erro ao deletar o arquivo:', err);
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});