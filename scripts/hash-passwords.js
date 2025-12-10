require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../models');

async function hashPasswords() {
  try {
    console.log('🔄 Iniciando criptografia de senhas...');
    
    const users = await User.findAll();
    let updated = 0;

    for (const user of users) {
      if (user.password_hash && !user.password_hash.startsWith('$2')) {
        const hashed = await bcrypt.hash(user.password_hash, 10);
        await user.update({ password_hash: hashed });
        console.log(`✓ ${user.email} - senha criptografada`);
        updated++;
      }
    }

    console.log(`\n✅ Processo concluído! ${updated} usuário(s) atualizado(s)`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro:', err.message);
    process.exit(1);
  }
}

hashPasswords();