const secret = process.env.JWT_SECRET;
// Verifica se a variável de ambiente está definida
if (!secret) {
  throw new Error(
    "JWT_SECRET não configurada. Verifique o arquivo .env."
  );
}

module.exports = secret;