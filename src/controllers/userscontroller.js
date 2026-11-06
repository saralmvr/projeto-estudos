const Yup = require("yup");
const { Op } = require("sequelize");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = require("../config/jwt");

const { enviarEmailRecuperacao } = require('../config/mailer');
const crypto = require('crypto');

module.exports = {
    async esqueciSenha(req, res) {
        try {
            const { email } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Gerar token seguro
            const token = crypto.randomBytes(20).toString('hex');
            const expiracao = new Date();
            expiracao.setHours(expiracao.getHours() + 1); // Token expira em 1 hora

            // Salvar token e expiração no banco de dados
            user.resetPasswordToken = token;
            user.resetPasswordExpires = expiracao;
            await user.save();

            // Enviar o e-mail
            await enviarEmailRecuperacao(user.email, token);

            return res.json({ message: 'E-mail de recuperação enviado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro interno ao processar recuperação de senha.' });
        }
    }
};

// campos publicos
const publicFields = [
  "id",
  "name",
  "email",
  "provider",
  "created_at",
  "updated_at",
];

// função auxiliar, formata o ID e retorna apenas os campos públicos (excluindo a senha)
const formatUserResponse = (user) => {
  const json = user.toJSON ? user.toJSON() : user;
  return {
    id: String(json.id).padStart(3, "0"),
    name: json.name,
    email: json.email,
    provider: json.provider,
    created_at: json.created_at,
    updated_at: json.updated_at,
  };
};

class UserController {
  async index(req, res) {
    const users = await User.findAll({ attributes: publicFields });
    const formattedUsers = users.map(formatUserResponse);
    return res.json(formattedUsers);
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: publicFields,
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.json(formatUserResponse(user));
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().trim().required("O nome é obrigatório."),

      email: Yup.string()
        .trim()
        .email("E-mail inválido.")
        .required("O e-mail é obrigatório."),

      password: Yup.string()
        .required("A senha é obrigatória.")
        .min(6, "A senha deve ter pelo menos 6 caracteres.")
        .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
        .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
        .matches(/[0-9]/, "A senha deve conter pelo menos um número."),

      provider: Yup.boolean().default(false),
    });

    let validatedData;

    try {
      validatedData = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (err) {
      return res.status(400).json({
        error: "Falha na validação.",
        messages: err.errors,
      });
    }

    // Verifica se o nome ou e-mail já existem
    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ name: validatedData.name }, { email: validatedData.email }],
      },
    });

    if (userExists) {
      if (userExists.email === validatedData.email) {
        return res.status(400).json({
          error: "E-mail já cadastrado.",
        });
      }

      if (userExists.name === validatedData.name) {
        return res.status(400).json({
          error: "Nome já cadastrado.",
        });
      }
    }

    try {
      const user = await User.create(validatedData);

      return res.status(201).json(formatUserResponse(user));
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao criar usuário.",
        details: error.message,
      });
    }
  }
  // método de login para a autenticação via jwt
  async login(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().trim().required("Informe seu nome ou e-mail."),

      password: Yup.string().required("A senha é obrigatória."),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        error: "Falha na validação.",
        messages: err.errors,
      });
    }

    const { login, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: login }, { name: login }],
      },
    });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({
        error: "Nome, e-mail ou senha inválidos.",
      });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      user: formatUserResponse(user),
      token,
    });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().trim(),
      email: Yup.string().trim().email("E-mail inválido."),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres.")
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required("Informe a nova senha.") : field,
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password
          ? field
              .required("Confirme a nova senha.")
              .oneOf([Yup.ref("password")], "As senhas não conferem.")
          : field,
      ),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Falha na validação.", messages: err.errors });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const { name, email, oldPassword } = req.body;

    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          ...(name && name !== user.name ? [{ name }] : []),
          ...(email && email !== user.email ? [{ email }] : []),
        ],
        id: {
          [Op.ne]: user.id,
        },
      },
    });

    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({ error: "E-mail já cadastrado." });
      }

      if (userExists.name === name) {
        return res.status(400).json({ error: "Nome já cadastrado." });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Senha atual incorreta." });
    }

    await user.update(req.body);

    return res.json(formatUserResponse(user));
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    await user.destroy();

    return res.status(204).send();
  }
}

module.exports = new UserController();
