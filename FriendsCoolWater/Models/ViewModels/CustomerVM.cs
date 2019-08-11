namespace FriendsCoolWater.Models.ViewModels
{
    public class CustomerVM : CustomerModel
    {
        public int TotalPerDay
        {
            get
            {
                return UnitPerDay * UnitPrice;
            }
        }

        public string CreatedByName { get; set; }
    }
}
