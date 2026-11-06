const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true para 465, false para outras portas
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const enviarEmailRecuperacao = async (emailDestino, token) => {
    const linkRecuperacao = `http://localhost:3000/redefinir-senha?token=${token}`;

    const info = await transporter.sendMail({
        from: '"Sistema de Estudos" <classmeteam@gmail.com>',
        to: emailDestino,
        subject: "Recuperação de Senha - Sistema de Estudos",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Recuperação de Senha</h2>
                <p>Você solicitou a redefinição de senha para o seu sistema de estudos.</p>
                <p>Clique no botão abaixo para prosseguir:</p>
                <a href="${linkRecuperacao}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Redefinir Senha</a>
                <p><small>Se não foi você, ignore este e-mail.</small></p>
            </div>
        `,
    });

    // Útil caso esteja usando Ethereal para ver o link do e-mail no terminal
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = { enviarEmailRecuperacao };