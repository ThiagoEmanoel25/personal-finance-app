const mongoose = require("mongoose");
const User = require("./models/User");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

async function checkDB() {
    try {
        console.log("🔌 Conectando ao Mongo para inspeção...");
        console.log("URL:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado!");

        // Listar Users
        const users = await User.find({});
        console.log("\n📊 Usuários encontrados na collection 'users':", users.length);
        users.forEach(u => console.log(` - ${u.name} (${u.email})`));

        // Listar Collections Reais
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("\n📚 Collections existentes no banco:");
        collections.forEach(c => console.log(` - ${c.name}`));

        process.exit(0);
    } catch (error) {
        console.error("❌ Erro:", error);
        process.exit(1);
    }
}

checkDB();
