using SmartGuideSystem.OracleDB.Model;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;

namespace SmartGuideSystem.OracleDB.Updator
{

    public static class OracleDBExport
    {

        //public static void ExportCMMTNUSERToJSon(SGSOragcleDataContext _db)
        //{
        //    var user =  _db.GetCMMTNUser();
        //    SaveFileToJson(user, "CMMTNUSER");
        //}

        //public static void ExportCMMTNDEPTToJSon(SGSOragcleDataContext _db)
        //{
        //    var user = _db.GetCMMTNDept();
        //    SaveFileToJson(user, "CMMTNDEPT");
        //}

        //public static void ExportOFRTNANOTANCMTToJSon(SGSOragcleDataContext _db)
        //{
        //    var gosi = _db.GetCurrentOFRTNANOTANCMT();
        //    SaveFileToJson(gosi, "OFRTNANOTANCMT");

        //    var files = _db.GetCMMTNFILE(gosi);
        //    SaveFileToJson(files, "CMMTNFILE");
        //}



        public async static void SaveFileToJson<T>(T dt, string fileName)
        {
            var option = new JsonSerializerOptions
            {
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.All)
            };
            string jsonString = JsonSerializer.Serialize(dt, option);

            await File.WriteAllTextAsync($"c:/temp/export_{fileName}_{DateTime.Now.ToString("yyyyMMddHHmmss")}.json", jsonString);


        }

    }
}
