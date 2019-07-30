using FriendsCoolWater.Services;
using Microsoft.Extensions.DependencyInjection;

namespace FriendsCoolWater.Email
{
    public static class SendGridExtensions
    {
        public static IServiceCollection AddSendGridEmailSender(this IServiceCollection services)
        {
            services.AddTransient<IEmailSender, SendGridEmailSender>();
            return services;
        }
    }
}
