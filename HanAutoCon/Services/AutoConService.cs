using HanAutoCon.Models;
using HanAutoCon.Utils;
using HwpObjectLib;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace HanAutoCon.Services
{
    public class AutoConService : IDisposable
    {
        private readonly ILogger<AutoConService> _logger;
        private readonly HwpObjectLib.HwpObject _hwpApp;

        const bool ConvertWebp = false;

        public AutoConService(ILogger<AutoConService> logger, IOptions<HanAutoConSettings> bookStoreDatabaseSettings)
        {
            _logger = logger;
            _hwpApp = new HwpObjectLib.HwpObject();
            _hwpApp.RegisterModule("FilePathCheckDLL", "MyModule");
        }

        public HanAutoConResult ConvertTo(string srcHwpPath, string dstConvertedPath, string format)
        {
            _hwpApp.Open(srcHwpPath, "", "");

            int pageCount = _hwpApp.PageCount;
            
            List<string> pageTextList = new List<string>();
            for (int i = 0; i < pageCount; i++)
            {
                string pageText = _hwpApp.GetPageText(i, null);
                if (string.IsNullOrEmpty(pageText))
                {
                    pageTextList.Add("");
                }
                else
                {
                    var buff = System.Text.Encoding.Default.GetBytes(pageText);
                    var convertedText = System.Text.Encoding.UTF8.GetString(buff);
                    pageTextList.Add(convertedText);
                }
            }

            //_hwpApp.HAction.GetDefault("Print", _hwpApp.HParameterSet.HPrint.HSet);
            //var hPrintSet = _hwpApp.HParameterSet.HPrint.HSet;
            //hPrintSet.setItem("PrintMethod", 0);
            //_hwpApp.HParameterSet.HPrint.Execute(hPrintSet);
            //_hwpApp.HAction.Execute("Print", _hwpApp.HParameterSet.HPrint.HSet);
            //var action = _hwpApp.CreateAction("Print");
            //var pset = action.CreateSet();
            //action.GetDefault(pset);
            //pset.SetItem("PrintMethod", 0);
            //action.Execute(pset);
            //var previewAction = _hwpApp.CreateAction("Print");

            _hwpApp.HAction.GetDefault("FileSaveAs_S", _hwpApp.HParameterSet.HFileOpenSave.HSet);
            _hwpApp.HParameterSet.HFileOpenSave.filename = dstConvertedPath;
            _hwpApp.HParameterSet.HFileOpenSave.Format = format;
            _hwpApp.HAction.Execute("FileSaveAs_S", _hwpApp.HParameterSet.HFileOpenSave.HSet);

            List<string> outputFilePathList = new List<string>();
            if (pageCount > 0)
            {
                var dstPathDir = System.IO.Path.GetDirectoryName(dstConvertedPath);
                var dstPathFileName = System.IO.Path.GetFileNameWithoutExtension(dstConvertedPath);
                var dstPathExtension = System.IO.Path.GetExtension(dstConvertedPath);

                for (int i = 0; i < pageCount; i++)
                {
                    var fullOutputPath = System.IO.Path.Combine(dstPathDir ?? "", $"{dstPathFileName}{(i+1):000}" + dstPathExtension);
                    if (File.Exists(fullOutputPath))
                    {
                        outputFilePathList.Add(fullOutputPath);
                    }
                }
            }
            else
            {
                outputFilePathList.Add(dstConvertedPath);
            }

            if (ConvertWebp)
            {
                //ConvertImageHelper.ConvertJpgsToWebps(outputFilePathList);
            }

            return new HanAutoConResult
            {
                DstFilePath = dstConvertedPath,
                SrcHwpFilePath = srcHwpPath,
                PageCount = pageCount,
                PageTextList = pageTextList,
                DstFilePathList = outputFilePathList
            };
        }

        public void Dispose()
        {
            if (_hwpApp!= null)
            {
                _hwpApp.Quit();
            }
        }
    }
}
