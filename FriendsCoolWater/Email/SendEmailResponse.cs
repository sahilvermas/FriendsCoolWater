namespace FriendsCoolWater.Email
{
    public class SendEmailResponse
    {
        public bool Successful => ErrorMsg == null;
        public string ErrorMsg { get; set; }
    }
}
