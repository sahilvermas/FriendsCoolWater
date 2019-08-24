using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FriendsCoolWater.Models.ViewModels
{
    public class TeamEmployeeVM
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
        public string EmployeeId { get; set; }
        public string TeamName { get; set; }
        public string EmployeeName { get; set; }
    }
}
