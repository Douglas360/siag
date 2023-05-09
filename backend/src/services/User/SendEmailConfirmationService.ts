const nodemailer = require('nodemailer');

interface IEmailContent {
    nome: string;
    email: string;
    senha: string;
}

interface IEmailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
}
class SendEmailConfirmationService {


    private async generateEmailContent(content: IEmailContent): Promise<IEmailOptions> {
        const htmlTemplate = `
                                <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
                                    <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 24px;">Bem-vindo(a) à nossa plataforma!</h2>
                                    <p>Olá ${content.nome},</p>
                                    <p>Parabéns, sua conta foi criada com sucesso!</p>
                                    <p>Aqui estão seus dados de acesso:</p>
                                    <ul>
                                    <li><strong>Login:</strong> ${content.email}</li>
                                    <li><strong>Senha:</strong> ${content.senha}</li>
                                    </ul>
                                    <p>A partir de agora, você poderá acessar nossa plataforma e aproveitar todas as funcionalidades que oferecemos.</p>
                                    <p>Atenciosamente,</p>
                                    <p>A equipe da nossa plataforma</p>
                                </div>
                            `;

        const textTemplate = `
                                    Bem-vindo(a) à nossa plataforma!
                                
                                    Olá ${content.nome},
                                
                                    Parabéns, sua conta foi criada com sucesso!
                                
                                    Aqui estão seus dados de acesso:
                                
                                    Login: ${content.email}
                                    Senha: ${content.senha}
                                
                                    A partir de agora, você poderá acessar nossa plataforma e aproveitar todas as funcionalidades que oferecemos.
                                
                                    Atenciosamente,
                                    A equipe da nossa plataforma
                          `;
        // Generate email content
        const emailContent: IEmailOptions = {
            from: '"Atendimento" <atendimento@magicti.com>',
            to: content.email,
            subject: "Conta criada com sucesso",
            //html: `Parabéns ${content.nome}, você criou sua conta com sucesso <br> seus dados de acesso: <br> Login: ${content.email} <br> Senha: ${content.senha} <br> `,
            html: htmlTemplate,
            text: textTemplate
        };

        return emailContent;
    }

    public async sendEmail(content: IEmailContent): Promise<void> {

        let transporter = nodemailer.createTransport({
            host: "smtp.umbler.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER_SEND_EMAIL!,
                pass: process.env.PASSWORD_SEND_EMAIL!
            },
        });

        // Validate input
        if (!content.nome || !content.email || !content.senha) {
            throw new Error('Missing required input fields');
        }

        // Generate email content
        const emailContent = await this.generateEmailContent(content);

        // Send email
        try {
            await transporter.sendMail(emailContent);
        } catch (error) {
            console.error('Failed to send email', error);
            throw new Error('Failed to send email');
        }
    }
}

export { SendEmailConfirmationService };


