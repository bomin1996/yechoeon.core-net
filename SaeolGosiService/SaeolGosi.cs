using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SaeolGosiService.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Threading.Tasks;

namespace SaeolGosiService
{
    public static class SaeolGosi
    {
        public static void AddSaeolGosiService(this IServiceCollection services, IConfiguration configuration)
        {
            //services.AddTransient<SaeolGosiService>();
            services.AddHostedService<UpdateGosiBackgroundService>();
        }
    }
}




//< a href = "javascript:void(0);" onclick = "goDownLoad('공시송달 공고(과년도 시정명령).hwp','공시송달 공고(과년도 시정명령)_ofr_ofr_GdlZcXrHhYSzRwKq_20230724103013703_2.hwp','/ntishome/file/upload/ofr/ofr/20230724')" class= "btn is-default is-small" data - brl - use = "NO" > 다운로드 </ a >




//< a href = "/DownloadEx.do?url=http%3A%2F%2Feminwon.jinju.go.kr%2Femwp%2Fjsp%2Fofr%2FFileDown.jsp%3Fuser_file_nm%3D%E2%98%862023%EB%85%84+%EC%8B%9C%EB%AF%BC%EC%A0%95%EC%9B%90%EC%82%AC+%EC%96%91%EC%84%B1%EA%B5%90%EC%9C%A1+%EC%8B%AC%ED%99%94%EA%B3%BC%EC%A0%95+%EC%88%98%EA%B0%95%EC%83%9D+%EB%AA%A8%EC%A7%91+%EA%B3%B5%EA%B3%A0.hwp%26sys_file_nm%3D%E2%98%862023%EB%85%84+%EC%8B%9C%EB%AF%BC%EC%A0%95%EC%9B%90%EC%82%AC+%EC%96%91%EC%84%B1%EA%B5%90%EC%9C%A1+%EC%8B%AC%ED%99%94%EA%B3%BC%EC%A0%95+%EC%88%98%EA%B0%95%EC%83%9D+%EB%AA%A8%EC%A7%91+%EA%B3%B5%EA%B3%A0_ofr_ofr__dTid3o_m7YhTACA_20230728175551884_1.hwp%26file_path%3D%2Fntishome%2Ffile%2Fupload%2Fofr%2Fofr%2F20230728&amp;name=%E2%98%862023%EB%85%84+%EC%8B%9C%EB%AF%BC%EC%A0%95%EC%9B%90%EC%82%AC+%EC%96%91%EC%84%B1%EA%B5%90%EC%9C%A1+%EC%8B%AC%ED%99%94%EA%B3%BC%EC%A0%95+%EC%88%98%EA%B0%95%EC%83%9D+%EB%AA%A8%EC%A7%91+%EA%B3%B5%EA%B3%A0.hwp" class= "filename" >☆2023년 시민정원사 양성교육 심화과정 수강생 모집 공고.hwp</a>


//"/DownloadEx.do?url=http://eminwon.jinju.go.kr/emwp/jsp/ofr/FileDown.jsp?user_file_nm=☆2023년+시민정원사+양성교육+심화과정+수강생+모집+공고.hwp&sys_file_nm=☆2023년+시민정원사+양성교육+심화과정+수강생+모집+공고_ofr_ofr__dTid3o_m7YhTACA_20230728175551884_1.hwp&file_path=/ntishome/file/upload/ofr/ofr/20230728&amp;name=☆2023년+시민정원사+양성교육+심화과정+수강생+모집+공고.hwp"


//	//-------------------------------------------------------------------
//	// 설명   : 고시공고 목록 조회
//	//-------------------------------------------------------------------	
//		function goPage(){
//    var f = document.form;

//    f.target = "_self";
//    f.action = "/emwp/gov/mogaha/ntis/web/ofr/action/OfrAction.do";
//    f.method.value = 'selectListOfrNotAncmt'; //Action
//    f.methodnm.value = 'selectListOfrNotAncmtHomepage';
//    f.submit();
//}
////-------------------------------------------------------------------
//// 설명   : 고시공고 첨부파일 다운로드
////-------------------------------------------------------------------
//function goDownLoad(de_user_file_nm, de_sys_file_nm, de_file_path)
//{
//    var enc_de_user_file_nm = encodeURI(de_user_file_nm);
//    var enc_de_sys_file_nm = encodeURI(de_sys_file_nm);
//    var enc_de_file_path = encodeURI(de_file_path);
//    location.href = "/emwp/jsp/ofr/FileDown.jsp?user_file_nm=" + enc_de_user_file_nm + "&sys_file_nm=" + enc_de_sys_file_nm + "&file_path=" + enc_de_file_path;
//}



    //< a href = "javascript:goDownLoad('2023 덕양구 방치자전거 관리대장.xlsx','2023 덕양구 방치자전거 관리대장_ofr_ofr_wB@en5KxqyQvLQFw_20230731175022637_1.xlsx','/ntishome/file/upload/ofr/ofr/20230731')" > 2023 덕양구 방치자전거 관리대장.xlsx</a>