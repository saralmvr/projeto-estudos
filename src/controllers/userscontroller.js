const Yup = require("yup");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = require("../config/jwt");

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
      password: Yup.string(),
      provider: Yup.boolean().default(false),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Falha na validação.", messages: err.errors });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    try {
      const user = await User.create(req.body);
      return res.status(201).json(formatUserResponse(user));
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao criar usuário.", details: error.message });
    }
  }
  // método de login para a autenticação via jwt
  async login(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("E-mail inválido.")
        .required("O e-mail é obrigatório."),
      password: Yup.string().required("A senha é obrigatória."),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Falha na validação.", messages: err.errors });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
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

    const { email, oldPassword } = req.body;

    if (email && email !== user.email) {
      const emailInUse = await User.findOne({ where: { email } });
      if (emailInUse) {
        return res.status(400).json({ error: "E-mail já cadastrado." });
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
