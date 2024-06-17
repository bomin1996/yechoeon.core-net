using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SaeolGosiService.Results
{
    public class SOResult1204
    {
        public int file_seq { get; set; }
        public string file_nm { get; set; }
        public string sys_file_nm { get; set; }
        public string file_path { get; set; }
        public string file_size { get; set; }

        //<file_size>46</file_size>
        //     <file_path>/ntishome/file/upload/ofr/ofr/20221006</file_path>
        //     <file_seq>1</file_seq>
        //     <sys_file_nm>테스트테스트테스트테스트테스트테스트테스트테스트_ofr_ofr_H1gi13OtrBaG9wAD_20221006155821047_1.txt</sys_file_nm>
        //     <file_nm>테스트테스트테스트테스트테스트테스트테스트테스트.txt</file_nm>


        //        <file_size>21</file_size>
        //<file_path>/ntishome/file/upload/ofr/ofr/20221006</file_path>
        //<file_seq>2</file_seq>
        //<sys_file_nm>테스트메모장2_ofr_ofr_H1gi13OtrBaG9wAD_20221006155821047_2.txt</sys_file_nm>
        //<file_nm>테스트메모장2.txt</file_nm>
    }
}
