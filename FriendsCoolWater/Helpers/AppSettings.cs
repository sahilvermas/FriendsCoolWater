namespace FriendsCoolWater.Helpers
{
    public class AppSettings
    {
        public string Site { get; set; }
        public string Audience { get; set; }
        public string ExpireTime { get; set; }
        public string Secret { get; set; }

        // SendGrid properties
        public string SendGridUser { get; set; }
        public string SendGridKey { get; set; }
    }
}
