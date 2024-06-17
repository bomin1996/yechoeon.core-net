using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SaeolGosiService.Results
{
    public class SOResult1201
    {
        public int row_num_desc { get; set; }
        public int row_num { get; set; }
        public string not_ancmt_se_code { get; set; }
        public string not_ancmt_se_nm { get; set; }
        public string not_ancmt_reg_no { get; set; }
        public string not_ancmt_mgt_no { get; set; }

        public string not_ancmt_sj { get; set; }
        public string dep_nm { get; set; }
        public string chr_nm { get; set; }
        public string telno { get; set; }
        public string pbs_hop_ymd { get; set; }
        public string pbs_ymd { get; set; }
        public string inq_cnt { get; set; }
        public string pbs_tlt_no { get; set; }
        public string frst_reg_ts { get; set; }
        public string last_mod_ts { get; set; }

        public string cgg_pbs_yn { get; set; }
        public string sido_pbs_yn { get; set; }
        public string homepage_pbs_yn { get; set; }
        public string bbs_pbs_yn { get; set; }
        public string nppe_pbs_yn { get; set; }
        public string upis_pbs_yn { get; set; }
        public string etc_pbs_yn { get; set; }


        //<dep_nm>홍보담당관</dep_nm>
        //      <telno></telno>
        //      <etc_pbs_yn></etc_pbs_yn>
        //      <not_ancmt_sj>의회채번테스트</not_ancmt_sj>
        //      <pbs_hop_ymd>2017-08-01</pbs_hop_ymd>
        //      <not_ancmt_se_nm>공고(입법예고)</not_ancmt_se_nm>
        //      <upis_pbs_yn></upis_pbs_yn>
        //      <pbs_ymd></pbs_ymd>
        //      <not_ancmt_mgt_no>27152</not_ancmt_mgt_no>
        //      <pbs_tlt_no></pbs_tlt_no>
        //      <last_mod_ts>20170801</last_mod_ts>
        //      <frst_reg_ts>20170801</frst_reg_ts>
        //      <chr_nm>공보01</chr_nm>
        //      <not_ancmt_reg_no>전주시 의회 공고 제2017-1호</not_ancmt_reg_no>
        //      <bbs_pbs_yn></bbs_pbs_yn>
        //      <cgg_pbs_yn></cgg_pbs_yn>
        //      <inq_cnt>12</inq_cnt>
        //      <not_ancmt_se_code>03</not_ancmt_se_code>
        //      <row_num>149</row_num>
        //      <row_num_desc>6</row_num_desc>
        //      <nppe_pbs_yn></nppe_pbs_yn>
        //      <sido_pbs_yn></sido_pbs_yn>
        //      <homepage_pbs_yn>Y</homepage_pbs_yn>
        //1 ROW_NUM_DESC 역순번 NUMBER 10 N 10,9,8,7,...
        //2 ROW_NUM 순번 NUMBER 10 N 1,2,3,4,...

        //3 NOT_ANCMT_SE_
        //CODE 고시공고 구분코드 VARCHAR2 2 N

        //01:고시
        //02:입찰공고
        //03:입법예고
        //04:일반공고
        //05:채용공고
        //06:개인정보제3자제공
        //07:개인정보위탁

        //4 NOT_ANCMT_SE_
        //NM 고시공고 구분 VARCHAR2 20 N
        //5 NOT_ANCMT_MG
        //T_NO 고시공고 관리번호 VARCHAR2 20 N Y 상세조회,첨부파일
        //검색 시 사용(KEY)

        //6 NOT_ANCMT_RE
        //G_NO 고시공고 번호 VARCHAR2 100 N OO시 공고
        //제2020-1호

        //7 NOT_ANCMT_SJ 고시공고 제목 VARCHAR2 200 N
        //8 DEP_NM 담당부서 VARCHAR2 100 N
        //9 CHR_NM 담당자 VARCHAR2 30 N
        //10 TELNO 연락처 VARCHAR2 20
        //11 PBS_HOP_YMD 게재(공고)일자 CHAR 8 N 20200325
        //12 PBS_YMD 게재기간 VARCHAR2 50 20200325
        //~ 20200415

        //13 INQ_CNT 조회수 CHAR 8
        //14 PBS_TLT_NO 게재제호 VARCHAR2 20
        //15 FRST_REG_TS 등록일자 CHAR 8 N
        //16 LAST_MOD_TS 수정일자 CHAR 8
        //17 CGG_PBS_YN 시군구게재여부 CHAR 1
        //18 SIDO_PBS_YN 시도게재여부 CHAR 1
        //19 HOMEPAGE_PBS
        //_YN 홈페이지게재여부 CHAR 1
        //20 BBS_PBS_YN 게시판게재여부 CHAR 1
        //21 NPPE_PBS_YN 신문게재여부 CHAR 1
        //22 UPIS_PBS_YN UPIS게재여부 CHAR 1
        //23 ETC_PBS_YN 기타게재여부 CHAR 1
    }
}
