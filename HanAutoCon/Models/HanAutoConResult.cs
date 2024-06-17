using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HanAutoCon.Models
{
    public class HanAutoConResult
    {
        public string SrcHwpFilePath { get; init; }
        public string DstFilePath { get; init; }
        public int PageCount { get; init; }
        public List<string> PageTextList { get; init; }
        public List<string> DstFilePathList { get; init; }
    }
}
