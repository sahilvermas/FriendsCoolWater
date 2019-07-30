using FriendsCoolWater.Email;
using FriendsCoolWater.Helpers;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace FriendsCoolWater.Services
{
    public class SendGridEmailSender: IEmailSender
    {
        private readonly AppSettings _appSettings;

        public SendGridEmailSender(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task<SendEmailResponse> SendEmailAsync(string receiverEmail, string emailSubject, string emailBody)
        {
            var apiKey = _appSettings.SendGridKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("www.sahilv@gmail.com", "FriendsCoolWater.com");
            var subject = emailSubject;
            var to = new EmailAddress(receiverEmail, "FriendsCoolWater");
            var plainTextContent = emailBody;
            var htmlContent = emailBody;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return new SendEmailResponse();
        }
    }
}
