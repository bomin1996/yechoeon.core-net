/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        second: ["GmarketSans"],
      },
      colors: {
        primary: {
          back: "#e8e6da",
          active: "#e8e6da",
          inactive: "#231F21",
          backArea: "#cfcabf",
        },
        secondary: {
          50: "#000000",
          back1: "#322D2F",
          back2: "#474042",
        },
        border: {
          50: "#000000",
        },
        accent: {
          title: "#131834", //Jinju
          // title: "#040A0A", //ury
          // popupTitle: "#131834", //Jinju
          // popupTitle: "#062B2A", //ury
          popupTitle: "#001026", //gangseo

          // default: "#1A7CC8", //Jinju
          // second: "#E7F5FF", //Jinju
          // text: "#1A7CC8", //Jinju
          // default: "#00908D", //ury
          // second: "#E2F5F5", //ury
          // text: "#00908D", //ury
          default: "#265595", //gangseo
          second: "#E2F5F5", //gangseo
          text: "#00908D", //gangseo

          border: "#131834", // jinju
          pink: "#f44278",
        },
        button: {
          // default: "#062B2A", //ury
          // default: "#131834", //jinju
          default: "#004098", //gangseo

          second: "#ffffff", //ury
        },
        back: {
          rightTitle: "#9DFFFD", //ury
          rightTitleLayout: "#E2F5F5",
        },
        layout: {
          // border: "#292F3C", //jinju
          // border: "#032827", //ury
          border: "#213249", //gangseo
        },
      },
      backgroundImage: {
        // "main-background": "url('assets/background/main.webp')",
        //"main-background": "url('assets/background/main_jinju.webp')",
        // "main-background": "url('assets/background/main_gangseo.webp')",
        "main-background": "url('assets/background/main_yecheon.png')",

        "dept-search-reaultitem":
          "url('assets/frame/search/SearchDeptCard2.svg')",
        // "dept-search-reaultitem": "url('assets/frame/search/SearchDeptCard.svg')",
        // "user-search-reaultitem":"url('assets/frame/search/SearchUserCard.svg')",
        "user-search-reaultitem":
          "url('assets/frame/search/SearchUserCard2.svg')",
      },
      spacing: {
        "horizontal-bottombar-height": "120px",
        "vertical-bottombar-height": "196px",
        "vertical-topbar-height": "128px",
        mainRightSpacing: "20px",
        mainSecondRightSpacing: "68px",
        mainTopSpacing: "20px",
      },
      padding: {
        bottomBarHeight: "128px",
        bottomBarHeightpp: "128px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
