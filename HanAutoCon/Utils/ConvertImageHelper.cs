using SixLabors.ImageSharp.Formats.Webp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HanAutoCon.Utils
{
    public static class ConvertImageHelper
    {
        //https://liamhunt.blog/posts/convert-images-webp-csharp/
        public static void ConvertJpgToWebp(string srcJpg, string destWebp)
        {
            using (var fs = new FileStream(srcJpg, FileMode.Open))
            using (var imgage = Image.Load(fs))
            {
                imgage.SaveAsWebp(destWebp);
            }
        }

        public static void ConvertJpgsToWebps(List<string> srcJpgList)
        {
            foreach (string srcJpg in srcJpgList)
            {
                string destWebp = Path.ChangeExtension(srcJpg, ".webp");
                ConvertJpgToWebp(srcJpg, destWebp);
            }
        }

    }
}
