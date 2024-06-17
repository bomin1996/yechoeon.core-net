import { IMember, ITeamInfo } from "../KioskInfo";

export interface IOrganizationChart2 {
    name:string,
    boss:IMember,
    jobs:Array<string>,
    teams:Array<ITeam>,
}

export interface ITeam extends ITeamInfo {
    leader: IMember,
    members: Array<IMember>,
}

const dummyData: IOrganizationChart2 = {
    name:"회계과",
    boss: {
        name:"전기수",
        grade: "과장",
        jobDescription: "회계과 업무전반",
        tel:"010-1234-5678",
        imageUrl:"dummy/profile2/전기수.webp",
    },
    jobs:[
        "○ 공유재산 관리",
        "○ 시청사 관리",
        "○ 입찰업무",
        "○ 지출업무(시비, 도비재배정, 국비재배정 예산)",

    ],
    teams:[
        {
            Type:"팀",
            Name:"재산관리팀",
            JobDescription:"○ 공유재산 관리\n○ 공유재산 매각\n○ 공유재산 대부료 부과, 징수\n○ 공유재산 실태조사",
            Depth:3,
            Contact:"",
            Tel:"055-749-5143",
            Fax:"055-749-5149",
            leader: {
                name:"김경옥",
                grade:"팀장",
                tel:"010-1234-5678",
                imageUrl:"dummy/profile2/김경옥.webp",
                jobDescription:"공유재산주요시책\n기획 및 조정",
            },
            members:[
                {
                    name:"김상주",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/김상주.webp",
                    jobDescription:"공유재산 대부\n공유차량 관리",
                },
                {
                    name:"이은선",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/이은선.webp",
                    jobDescription:"공유재산 매각\n공유재산관리계획",
                },
            ]
        },
        {
            Type:"팀",
            Name:"청사관리팀",
            JobDescription:"○ 시청사 관리\n○ 공공시설 건축\n○ 읍면동청사 관리 및 신축",
            Depth:3,
            Contact:"",
            Tel:"055-749-5144",
            Fax:"055-749-5149",
            leader: {
                name:"이동훈",
                grade:"팀장",
                tel:"010-1234-5678",
                status:"휴가중",
                imageUrl:"dummy/profile2/이동훈.webp",
                jobDescription:"○ 청사관리\n○ 읍 면 동 청사관리",
            },
            members:[
                {
                    name:"김행록",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/김행록.webp",
                    jobDescription:"시청사 관리",
                    status:"휴가중"
                },
                {
                    name:"한은지",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/한은지.webp",
                    jobDescription:"공무직관리\n한국지방재청공제회",
                    status:"출장중"
                },
                {
                    name:"노혜라",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/노혜라.webp",
                    jobDescription:"읍면동 청사관리",
                },
            ]
        },
        
        {
            Type:"팀",
            Name:"계약팀",
            JobDescription:"○ 입찰업무\n○ 공사계약\n○ 물품구매\n○ 용역계약\n○ 관용차량관리\n○ 압류채권관리",
            Depth:3,
            Contact:"",
            Tel:"055-749-5142",
            Fax:"055-749-5149",
            leader: {
                name:"안병경",
                grade:"팀장",
                tel:"010-1234-5678",
                imageUrl:"dummy/profile2/안병경.webp",
                jobDescription:"○ 공사계약\n○ 물품계약\n○ 용역계약",
            },
            members:[
                {
                    name:"김윤희",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/김윤희.webp",
                    jobDescription:"관급자재계약",
                },
                {
                    name:"문지현",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/문지현.webp",
                    jobDescription:"공사계약",
                },
                {
                    name:"배소연",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/배소연.webp",
                    jobDescription:"물품구매계약",
                },
                {
                    name:"이혜림",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/이혜림.webp",
                    jobDescription:"수의계약(공사)\n관급자재계약",
                },
                {
                    name:"김현영",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/김현영.webp",
                    jobDescription:"용역계약",
                },
                {
                    name:"고은비",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/고은비.webp",
                    jobDescription:"공사계약",
                },
                {
                    name:"문광현",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/문광현.webp",
                    jobDescription:"수의계약(용역)\n폐기물용역",
                },
            ]
        },
        {
            Type:"팀",
            Name:"경리팀",
            JobDescription:"○ 지출업무(시비, 도비재배정, 국비재배정 예산)\n○ 세입세출 예산결산\n○ 세입세출외현금 관리\n○ 복식부기운영, 재무결산",
            Depth:3,
            Contact:"",
            Tel:"055-749-5141",
            Fax:"055-749-5149",
            leader: {
                name:"정기현",
                grade:"팀장",
                status:"휴가중",
                tel:"010-1234-5678",
                imageUrl:"dummy/profile2/정기현.webp",
                jobDescription:"○ 지출업무\n○ 지출계약",
            },
            members:[
                {
                    name:"최인화",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/최인화.webp",
                    jobDescription:"과서무\n국도비 재배정",
                },
                {
                    name:"김설미",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/김설미.webp",
                    jobDescription:"예산계약\n지출원인행위",
                },
                {
                    name:"강민규",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/강민규.webp",
                    jobDescription:"복식부기\n재무결산",
                },
                {
                    name:"유민화",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/유민화.webp",
                    jobDescription:"지출관련업무",
                },
                {
                    name:"강유현",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    imageUrl:"dummy/profile2/강유현.webp",
                    jobDescription:"세입세출외현금",
                },
               
            ]
        },
        

        /*

        {
            Type:"팀",
            Name:"경리팀1",
            JobDescription:"○ 지출업무(시비, 도비재배정, 국비재배정 예산)\n○ 세입세출 예산결산\n○ 세입세출외현금 관리\n○ 복식부기운영, 재무결산",
            Depth:3,
            Contact:"",
            Tel:"055-749-5141",
            Fax:"055-749-5149",
            leader: {
                name:"정기현",
                grade:"팀장",
                status:"휴가중",
                tel:"010-1234-5678",
                jobDescription:"○ 지출업무\n○ 지출계약",
            },
            members:[
                {
                    name:"최인화",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    jobDescription:"과서무\n국도비 재배정",
                },
               
               
            ]
        },
        {
            Type:"팀",
            Name:"경리팀2",
            JobDescription:"○ 지출업무(시비, 도비재배정, 국비재배정 예산)\n○ 세입세출 예산결산\n○ 세입세출외현금 관리\n○ 복식부기운영, 재무결산",
            Depth:3,
            Contact:"",
            Tel:"055-749-5141",
            Fax:"055-749-5149",
            leader: {
                name:"정기현",
                grade:"팀장",
                status:"휴가중",
                tel:"010-1234-5678",
                jobDescription:"○ 지출업무\n○ 지출계약",
            },
            members:[
                {
                    name:"최인화",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    jobDescription:"과서무\n국도비 재배정",
                },
               
               
            ]
        },
        {
            Type:"팀",
            Name:"경리팀3",
            JobDescription:"○ 지출업무(시비, 도비재배정, 국비재배정 예산)\n○ 세입세출 예산결산\n○ 세입세출외현금 관리\n○ 복식부기운영, 재무결산",
            Depth:3,
            Contact:"",
            Tel:"055-749-5141",
            Fax:"055-749-5149",
            leader: {
                name:"정기현",
                grade:"팀장",
                status:"휴가중",
                tel:"010-1234-5678",
                jobDescription:"○ 지출업무\n○ 지출계약",
            },
            members:[
                {
                    name:"최인화",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    jobDescription:"과서무\n국도비 재배정",
                },
               
               
            ]
        },
        {
            Type:"팀",
            Name:"경리팀4",
            JobDescription:"○ 지출업무(시비, 도비재배정, 국비재배정 예산)\n○ 세입세출 예산결산\n○ 세입세출외현금 관리\n○ 복식부기운영, 재무결산",
            Depth:3,
            Contact:"",
            Tel:"055-749-5141",
            Fax:"055-749-5149",
            leader: {
                name:"정기현",
                grade:"팀장",
                status:"휴가중",
                tel:"010-1234-5678",
                jobDescription:"○ 지출업무\n○ 지출계약",
            },
            members:[
                {
                    name:"최인화",
                    grade:"주무관",
                    tel:"010-1234-5678",
                    jobDescription:"과서무\n국도비 재배정",
                },
               
               
            ]
        },

        */
    ],

    
}

export default dummyData;