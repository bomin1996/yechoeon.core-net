using SmartGuideSystem.DB.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.ServiceInterface.InsaDB
{
    public interface IInsaDBService
    {
        void ImportAllDepartmentsAndAllUsers(InsaDBUpdateOption option);
        List<SGUser> UpdateUsersByDeptCode(string deptCode, InsaDBUpdateOption option);
    }
}
