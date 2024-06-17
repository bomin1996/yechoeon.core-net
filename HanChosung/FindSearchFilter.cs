using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HanChosung
{
    public class FindSearchFilter
    {
        public static readonly string FirstSound = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
        public static readonly string MidSound = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
        public static readonly string LastSound = " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
        private static readonly ushort 유니코드첫한국어 = 0xAC00;
        private static readonly ushort 유니코드마지막한국어 = 0xD79F;
        public static SearchCharactor HangulDivider(char 한글자)
        {
            int first, mid, final;    // 초성,중성,종성의 인덱스
            ushort tempUnicode = 0x0000;                // 임시로 코드값을 담을 변수
            SearchCharactor result = new SearchCharactor();

            //Char을 16비트 부호없는 정수형 형태로 변환 - Unicode
            tempUnicode = Convert.ToUInt16(한글자);

            // 캐릭터가 한글이 아닐 경우 처리
            if ((tempUnicode < 유니코드첫한국어) || (tempUnicode > 유니코드마지막한국어))
            {
                result.한글인가 = "NH";
                result.원래글자 = 한글자;
                result.음소 = null;
            }
            else
            {
                // nUniCode에 한글코드에 대한 유니코드 위치를 담고 이를 이용해 인덱스 계산.
                int iUnicode = tempUnicode - 유니코드첫한국어;
                first = iUnicode / (21 * 28);
                iUnicode = iUnicode % (21 * 28);
                mid = iUnicode / 28;
                iUnicode = iUnicode % 28;
                final = iUnicode;

                result.한글인가 = "H";
                result.원래글자 = 한글자;
                result.음소 = new char[] { FirstSound[first], MidSound[mid], LastSound[final] };
            }

            return result;
        }

        public static string ChosungDivider(string fullName)
        {
            try
            {
                List<char> chars = new List<char>();
                chars.AddRange(fullName.Select(c => c));

                string strResult = "";
                foreach (var c in chars)
                {
                    var result = HangulDivider(c);
                    strResult += result.음소?.FirstOrDefault();
                }

                return strResult;
            }
            catch (Exception e)
            {
                return "";
            }

        }
    }

    public struct SearchCharactor
    {
        /// <summary>
        ///  한글여부(H, NH)
        /// </summary>
        public string 한글인가;
        /// <summary>
        /// 분석 한글
        /// </summary>
        public char 원래글자;
        /// <summary>
        /// 분리 된 한글(강 -> ㄱ,ㅏ,ㅇ)
        /// </summary>
        public char[] 음소;
    }


}
