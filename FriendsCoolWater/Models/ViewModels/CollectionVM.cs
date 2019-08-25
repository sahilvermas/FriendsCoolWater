namespace FriendsCoolWater.Models.ViewModels
{
    public class CollectionVM : CollectionModel
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public bool TeamActive { get; set; }
        public string FirmName { get; set; }
        public string CustomerName { get; set; }
        public bool CustomerActive { get; set; }
        public double CalculatedAmount { get; set; }
        public string EmployeeByName { get; set; }
        public string ModifiedByName { get; set; }
    }
}
