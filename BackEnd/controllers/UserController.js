const bcrypt = require('bcrypt');
const db = require('../dataBase/conn');
const jwt = require('jsonwebtoken');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const JWT_SECRET = 'segredo-de-token';

exports.register = async (req, res) => {
    const { nome, email, senha } = req.body;

    // Validações
    if (!nome || nome.trim().length < 3) {
        return res.status(400).json({ mensagem: 'Nome deve ter pelo menos 3 caracteres.' });
    }

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ mensagem: 'Email inválido.' });
    }

    if (!senha || senha.length < 8) {
        return res.status(400).json({ mensagem: 'A senha deve ter pelo menos 8 caracteres.' });
    }

    // Verificar se o email já existe
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ mensagem: 'Erro no servidor ao verificar email.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ mensagem: 'Email já cadastrado!' });
        }

        try {
            const hashedPassword = await bcrypt.hash(senha, 10);

            db.query(
                'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
                [nome.trim(), email, hashedPassword],
                (err) => {
                    if (err) {
                        console.error('Erro ao cadastrar usuário:', err);
                        return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' });
                    }

                    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
                }
            );
        } catch (error) {
            console.error('Erro ao criptografar senha:', error);
            return res.status(500).json({ mensagem: 'Erro interno ao processar senha.' });
        }
    });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ mensagem: 'Email inválido.' });
    }

    if (!senha || senha.length < 8) {
        return res.status(400).json({ mensagem: 'Senha inválida.' });
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ mensagem: 'Erro ao realizar login.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
        }

        const user = results[0];
        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Senha incorreta.' });
        }

        // Gerar JWT
        const token = jwt.sign(
            { id: user.id, nome: user.nome, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' } 
        );

        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            usuario: {
                nome: user.nome,
                email: user.email
            },
            token 
        });
    });
};

exports.getHome = (req, res) => {
    res.status(200).json({ mensagem: 'Bem-vindo à Home!' });
};

// Middleware para verificar o token
exports.authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token inválido.' });
        }
        req.user = decoded;
        next();
    });
};
