const db = require('../dataBase/conn');

exports.register = (req, res) => {
    const { nome, email, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ mensagem: 'Erro no servidor ao verificar email.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ mensagem: 'Email já cadastrado!' });
        }

        db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', 
        [nome, email, senha], 
        (err) => {
            if (err) {
                console.error('Erro ao cadastrar usuário:', err);
                return res.status(500).json({ mensagem: 'Erro no servidor ao cadastrar usuário.' });
            }
            res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
        });
    });
};


exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', 
    [email, senha], 
    (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const user = results[0];
        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            usuario: {
                nome: user.nome,
                email: user.email
            }
        });
    });
};

exports.getHome = (req, res) => {
    res.status(200).json({ mensagem: 'Bem-vindo à Home!' });
};
