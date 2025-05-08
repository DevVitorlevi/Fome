const express = require('express');
const app = express();
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', UserRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
