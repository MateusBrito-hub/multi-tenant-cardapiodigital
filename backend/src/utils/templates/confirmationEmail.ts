export const confirmationEmailTemplate = (name: string, token: string) => `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>Confirmação de E-mail</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          background-color: #ffffff;
          max-width: 600px;
          margin: 40px auto;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .header {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
        }
        .message {
          margin: 20px 0;
          font-size: 16px;
          color: #555555;
        }
        .button {
          display: inline-block;
          background-color: #4CAF50;
          color: #ffffff !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Olá, ${name}!</div>
        <div class="message">
          Obrigado por se cadastrar em nossa plataforma.<br />
          Para concluir o processo, confirme seu e-mail clicando no botão abaixo:
        </div>
        <a
          href="${process.env.APP_URL}/user/confirmar-email?token=${token}"
          class="button"
          target="_blank"
        >
          Confirmar e-mail
        </a>
        <div class="message">
          Se você não se registrou, pode ignorar este e-mail com segurança.
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Cardápio Digital. Todos os direitos reservados.
        </div>
      </div>
    </body>
  </html>
`;
