const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const authorization = req.get("authorization");

  // Verifica se o cabeçalho contém um Bearer token.
  const match = authorization
    ? authorization.match(/^Bearer\s+(\S+)$/i)
    : null;

  if (!match) {
    return res.status(401).json({
      success: false,
      error: {
        code: "TOKEN_MISSING",
        message: "Token de autenticação não informado."
      }
    });
  }

  const token = match[1];

  try {
    // Verifica a assinatura e a validade do JWT.
    const payload = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"]
    });

    // O login do projeto gera o token com { id: user.id }.
    if (
      !payload ||
      typeof payload !== "object" ||
      payload.id == null
    ) {
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_TOKEN",
          message: "Token inválido."
        }
      });
    }

    // Disponibiliza a identidade verificada para a próxima etapa.
    req.user = {
      id: payload.id
    };

    return next();
  } catch (err) {
    if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError" ||
      err.name === "NotBeforeError"
    ) {
      const expirado = err.name === "TokenExpiredError";

      return res.status(401).json({
        success: false,
        error: {
          code: expirado ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
          message: expirado
            ? "O token expirou. Faça login novamente."
            : "Token inválido."
        }
      });
    }

    return next(err);
  }
}

module.exports = authMiddleware;