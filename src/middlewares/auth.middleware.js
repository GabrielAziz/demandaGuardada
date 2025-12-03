// import { AUTH_COOKIE_NAME, verifyToken } from '../services/auth.service.js';

// export function authenticated(req, res, next) {
//   const token = req.cookies?.[AUTH_COOKIE_NAME];
//   if (!token) return res.status(401).json({ error: 'Não autenticado.' });

//   const payload = verifyToken(token);
//   if (!payload) return res.status(401).json({ error: 'Token inválido ou expirado.' });

//   req.user = { cpf: payload.cpf, type: payload.type };
//   next();
// }

// export function isAdmin(req, res, next) {
//   authenticated(req, res, () => {
//     if (req.user?.type !== 'Gerente') return res.status(403).json({ error: 'Acesso negado. Requer perfil Gerente.' });
//     next();
//   });
// }

// export function isCollaborator(req, res, next) {
//   authenticated(req, res, () => {
//     if (req.user?.type !== 'Colaborador') return res.status(403).json({ error: 'Acesso negado. Requer perfil Colaborador.' });
//     next();
//   });
// }

// export function isClient(req, res, next) {
//   authenticated(req, res, () => {
//     if (req.user?.type !== 'Cliente') return res.status(403).json({ error: 'Acesso negado. Requer perfil Cliente.' });
//     next();
//   });
// }