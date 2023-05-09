import { Request, Response } from "express";
import { SendEmailConfirmationService } from "../../services/User/SendEmailConfirmationService";


class SendEmailConfirmationController {
    async handle(req: Request, res: Response) {
        const { email, nome, senha } = req.body;

        // Create an instance of SendEmailConfirmationService
        const sendEmailConfirmationService = new SendEmailConfirmationService();

        try {
            // Call sendEmail method to send confirmation email
            await sendEmailConfirmationService.sendEmail({
                email,
                nome,
                senha,
            });
            return res.json("Email enviado com sucesso");
        } catch (err) {
            console.error(err);
            return res.status(500).json("Ocorreu um erro ao enviar o email de confirmação.");
        }
    }
}

export { SendEmailConfirmationController };
