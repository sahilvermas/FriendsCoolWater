namespace FriendsCoolWater.Models.ViewModels
{
    public class CustomerVM : Customer
    {
        public int TotalPerDay
        {
            get
            {
                return UnitPerDay * UnitPrice;
            }
        }
    }
}
