using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FriendsCoolWater.Email
{
    public interface IEmailSender
    {
        // Send email to user with given information
        Task<SendEmailResponse> SendEmailAsync(string receiverEmail, string emailSubject, string emailBody);
    }
}
