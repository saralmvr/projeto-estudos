function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  const statusInformado = err.statusCode || err.status;

  const status =
    Number.isInteger(statusInformado) &&
    statusInformado >= 400 &&
    statusInformado <= 599
      ? statusInformado
      : 500;

  const producao = process.env.NODE_ENV === "production";

  return res.status(status).json({
    success: false,
    error: {
      code: status >= 500
        ? "INTERNAL_SERVER_ERROR"
        : "REQUEST_ERROR",
      message:
        status >= 500 && producao
          ? "Ocorreu um erro interno no servidor."
          : err.message || "Não foi possível processar a requisição."
    }
  });
}

module.exports = errorHandler;