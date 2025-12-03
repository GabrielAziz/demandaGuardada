// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import {
//   createUser,
//   findUserByEmail,
//   findUserByCpf,
// } from '../repository/user.repository.js';

// const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
// const TOKEN_COOKIE_NAME = 'petnet_token';
// const TOKEN_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

// function signToken(payload) {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
// }

// export async function signup(req, res) {
//   try {
//     const userParam = req.body;
//     const { usu_cpf, usu_email, usu_senha, usu_nome, usu_tipo, usu_foto_url } = userParam;

//     if (!usu_cpf || !usu_email || !usu_senha || !usu_nome) {
//       return res.status(400).json({ erro: 'Campos obrigatórios (CPF, nome, email e senha) faltando' });
//     }

//     const cpfExist = await findUserByCpf(usu_cpf);
//     if (cpfExist) return res.status(400).json({ erro: 'CPF já cadastrado no sistema!' });

//     const emailExist = await findUserByEmail(usu_email);
//     if (emailExist) return res.status(400).json({ erro: 'Email já cadastrado no sistema!' });

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(usu_senha, saltRounds);

//     const created = await createUser({
//       usu_cpf,
//       usu_nome,
//       usu_email,
//       usu_senha: hashedPassword,
//       usu_tipo: usu_tipo || 'Cliente',
//       usu_foto_url,
//     });

//     const token = signToken({ cpf: created.usu_cpf, tipo: created.usu_tipo });
//     setAuthCookie(res, token);

//     const { usu_senha: _, ...safeUser } = created;
//     return res.status(201).json({ mensagem: 'Cadastro realizado com sucesso', usuario: safeUser });
//   } catch (erro) {
//     return res.status(500).json({ erro: 'Erro ao realizar cadastro' });
//   }
// }

// export async function login(req, res) {
//   try {
//     const { email, senha } = req.body;
//     if (!email || !senha) {
//       return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
//     }

//     const user = await findUserByEmail(email);
//     if (!user || user.usu_data_exclusao) {
//       return res.status(401).json({ erro: 'Credenciais inválidas.' });
//     }

//     const ok = await bcrypt.compare(senha, user.usu_senha);
//     if (!ok) return res.status(401).json({ erro: 'Credenciais inválidas.' });

//     const token = signToken({ cpf: user.usu_cpf, tipo: user.usu_tipo });
//     setAuthCookie(res, token);

//     const { usu_senha: _, ...safeUser } = user;
//     return res.status(200).json({ mensagem: 'Login realizado com sucesso', usuario: safeUser });
//   } catch (erro) {
//     return res.status(500).json({ erro: 'Erro ao realizar login' });
//   }
// }

// export function logout(req, res) {
//   clearAuthCookie(res);
//   return res.status(200).json({ mensagem: 'Sessão encerrada com sucesso.' });
// }

// export function verifyToken(token) {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch {
//     return null;
//   }
// }

// export function setAuthCookie(res, token) {
//   const isProd = process.env.NODE_ENV === 'production';
//   res.cookie(TOKEN_COOKIE_NAME, token, {
//     httpOnly: true,
//     secure: !!(process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === 'true' : isProd),
//     sameSite: 'lax',
//     path: '/',
//     maxAge: 1000 * 60 * 60 * 2, // 2h
//   });
// }

// export function clearAuthCookie(res) {
//   res.clearCookie(TOKEN_COOKIE_NAME, { path: '/' });
// }

// export const AUTH_COOKIE_NAME = TOKEN_COOKIE_NAME;