using Microsoft.AspNetCore.Mvc;

namespace FriendsCoolWater.Controllers
{
    public class NotificationsController : Controller
    {
        public IActionResult EmailConfirmed(string userId, string confirmationCode)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(confirmationCode))
            {
                return Redirect("/login");
            }
            return View();
        }
    }
}