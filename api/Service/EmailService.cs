using HelpdeskAPI.Models.Helper;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace HelpdeskAPI.Service
{
    public class EmailService:IEmailService
    {

        private readonly EmailSettings emailSetting;
        public EmailService(IOptions<EmailSettings> options)
        {
            this.emailSetting = options.Value;
        }
       public async Task SendEmailAsync(MailRequest emailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(this.emailSetting.email);
            email.To.Add(MailboxAddress.Parse(emailRequest.to_email));
            email.Subject = emailRequest.subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = emailRequest.body;
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(emailSetting.host, emailSetting.port, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailSetting.email, emailSetting.password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);

        }
    }
}
