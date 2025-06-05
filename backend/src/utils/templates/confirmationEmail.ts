export const confirmationEmailTemplate = (name: string, token: string) => `
    <h2>Olá, ${name}!</h2>
    <p>Obrigado por se cadastrar. Clique no botão abaixo para confirmar seu e-mail:</p>
    <p><a href="${process.env.APP_URL}/user/confirmar-email?token=${token}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Confirmar e-mail</a></p>
    <p>Se você não se registrou, ignore este e-mail.</p>
`;