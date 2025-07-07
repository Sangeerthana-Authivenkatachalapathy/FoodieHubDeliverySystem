using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Enums
{
<<<<<<< HEAD
<<<<<<<< HEAD:FoodieHubDeliverySystem.Repository/Enums/UserRole.cs
    internal class UserRole
========
    public enum PaymentStatus
>>>>>>>> master:FoodieHubDeliverySystem.Repository/Enums/PaymentStatus.cs
    {
        Pending,
        Paid,
        Failed
=======
    public enum UserRole
    {
        Customer,
        Restaurant,
        DeliveryPartner,
        Admin
>>>>>>> master
    }
}
