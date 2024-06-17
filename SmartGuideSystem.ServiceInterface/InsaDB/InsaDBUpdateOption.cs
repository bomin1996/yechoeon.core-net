using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.ServiceInterface.InsaDB
{
    public class InsaDBUpdateOption
    {
        public bool UpdateUserPhoto { get; set; } = true;
        public bool ForcedUpdate { get; set; } = false;
    }
}
