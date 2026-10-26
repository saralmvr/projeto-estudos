const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error(
    "JWT_SECRET não configurada. Verifique o arquivo .env."
  );
}

module.exports = secret;