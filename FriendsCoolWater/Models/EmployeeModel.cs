using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FriendsCoolWater.Models
{
    public class EmployeeModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Active { get; set; }

        public TeamModel TeamId { get; set; }
    }
}
