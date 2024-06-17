using System.Collections;

namespace WebpConverter
{
    public static class ConvertWebpImageHelper
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


        public static void ConvertImageToWebp(string srcImage, string destWebp)
        {
            using (var fs = new FileStream(srcImage, FileMode.Open))
            using (var imgage = Image.Load(fs))
            {
                imgage.SaveAsWebp(destWebp);
            }
        }

        public static Hashtable GetImageInfoTable(string srcImage)
        {
            using (var fs = new FileStream(srcImage, FileMode.Open))
            using (var image = Image.Load(fs))
            {
                var ht = new Hashtable();
                ht.Add("Width", image.Width);
                ht.Add("Height", image.Height);

                return ht;
            }
        }

    }
}