const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Transaction = require("./models/Transaction");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

// --- CONCEITOS ---
// 1. Mongoose: É o nosso ODM (Object Data Modeler). Ele traduz código JS para comandos do Banco de Dados.
// 2. JWT (JSON Web Token): É o crachá digital. Quando o usuário loga, damos um token. Ele usa esse token para pedir dados.

console.log("🔍 Tentando conectar ao Mongo com URI:", process.env.MONGO_URI); // DEBUG

// Conexão com MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado ao MongoDB!"))
    .catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

// Middleware de Autenticação (O Segurança)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401); // Sem crachá, sem acesso

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Crachá inválido
        req.user = user; // Salva quem é o usuário na requisição
        next();
    });
};

/* =========================================================
   ROTAS DE AUTENTICAÇÃO (AUTH)
   ========================================================= */

// REGISTRO
app.post("/api/auth/register", async (req, res) => {
    try {
        console.log("📝 Recebido pedido de registro:", req.body); // DEBUG
        const { name, email, password } = req.body;

        // Verifica se já existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("⚠️ Usuário já existe:", email);
            return res.status(400).json({ msg: "E-mail já cadastrado" });
        }

        // Criptografia
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        console.log("💾 Tentando salvar usuário no Mongo...");
        const savedUser = await newUser.save();
        console.log("✅ Usuário salvo com sucesso! ID:", savedUser._id);

        res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (err) {
        console.error("❌ Erro no Registro:", err); // LOG DETALHADO NO TERMINAL
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busca usuário
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

        // Verifica senha (Compara a senha digitada com a hash do banco)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Senha incorreta" });

        // Gera o Token (Crachá)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                stats: user.stats,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* =========================================================
   ROTAS DE ORÇAMENTO (TRANSAÇÕES)
   ========================================================= */

// LISTAR (GET)
app.get("/api/orcamento", authenticateToken, async (req, res) => {
    try {
        // Busca só as transações DESTE usuário
        const transactions = await Transaction.find({ userId: req.user.id }).sort({
            date: -1,
        });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CRIAR (POST)
app.post("/api/orcamento", authenticateToken, async (req, res) => {
    try {
        const { category, value, type, date } = req.body;

        const newTransaction = new Transaction({
            userId: req.user.id, // Vincula ao usuário logado
            category,
            value,
            type, // Entrada ou Saída
            date: date || Date.now(),
        });

        const savedTransaction = await newTransaction.save();
        res.json(savedTransaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// REMOVER (DELETE)
app.delete("/api/orcamento/:id", authenticateToken, async (req, res) => {
    try {
        await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id, // Garante que só deleta o seu próprio
        });
        res.json({ msg: "Item removido" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor MongoDB rodando na porta ${PORT}`);
});
