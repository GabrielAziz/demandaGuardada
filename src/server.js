import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js'; // Importa as rotas (e não o controller direto)

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || true,
  credentials: true,
}));

// Rota de verificação (Health Check)
app.get('/healthcheck', (req, res) => {
  return res.json("Servidor PetNet está online! 🚀");
});

// Configura o uso das rotas de usuário
// Tudo que chegar em /api vai para o arquivo index.routes.js
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
    Servidor rodando na porta ${PORT} 🚀

    http://localhos:${PORT}/healthcheck

    Acesse o banco de dados via Prisma Studio:
    $ npx prisma studio
    Prisma Studio ira estar acessível em http://localhost:5555
  `);
});