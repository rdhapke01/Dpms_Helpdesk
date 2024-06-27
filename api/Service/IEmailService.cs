using HelpdeskAPI.Models.Helper;

namespace HelpdeskAPI.Service
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
