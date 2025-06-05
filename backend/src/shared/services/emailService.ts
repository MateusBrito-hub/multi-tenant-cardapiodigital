// src/services/emailService.ts
import nodemailer from 'nodemailer';
import { confirmationEmailTemplate } from '../../utils/templates/confirmationEmail';


export const EmailService = {
    async sendConfirmationEmail(to: string, subject: string, token: string) : Promise<string | boolean> {

        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const html = confirmationEmailTemplate(subject, token);

        const info = await transporter.sendMail({
            from: `"Minha Aplicação" <${testAccount.user}>`,
            to,
            subject,
            html,
        });

        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

        return nodemailer.getTestMessageUrl(info)
    },
};
