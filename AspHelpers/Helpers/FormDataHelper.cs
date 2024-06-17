using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspHelpers.Helpers
{
    public static class FormDataHelper
    {

        public static async Task<string> SaveFormFileByGUIDName(IFormFile file, string imageSaveDirPath, string rootUrl = "serverimages")
        {
            long size = file.Length;
            string extension = System.IO.Path.GetExtension(file.FileName);

            var guid = Guid.NewGuid();
            var filePath = System.IO.Path.Combine(imageSaveDirPath, guid.ToString() + extension);

            if (file.Length > 0)
            {
                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }
            }
            var savedPath = Path.Combine(rootUrl, guid.ToString() + extension);
            return savedPath;
        } 

    }
}
