export interface ITheme {
  backgroundColor: string;
  textColor: string;
  mainHeader: {
    color: string;
    textShadow: string;
    txtLinkColor: string;
  };
  commonHeader: {
    color: string;
    textShadow: string;
  };
  menu: {
    itemColor: string;
    itemTextShadow: string;
  };
  block: {
    container: {
      backgroundColor: string;
      boxShadow: string;
    };
    block: {
      signalling: {
        background: string;
      };
      nonSignalling: {
        background: string;
      };
      upcoming: {
        background: string;
        border: string;
      };
    };
  };

  textShadowColor: string;
}

export const defaultTheme: ITheme = {
  backgroundColor: "", // TODO
  mainHeader: {
    color: "#d97b08",
    textShadow: "#000 3px 3px 0px",
    txtLinkColor: "#696969",
  },
  commonHeader: {
    color: "#ff9b20",
    textShadow: "#000 2px 2px 0px",
  },
  menu: {
    itemColor: "#ffd9aa",
    itemTextShadow: "#000 2px 2px 0px",
  },
  block: {
    container: {
      backgroundColor: "#434343",
      boxShadow: "#000 3px 3px 14px",
    },
    block: {
      signalling: {
        background: "linear-gradient(45deg, rgba(18,209,0,1) 0%, rgba(9,89,0,1) 100%)",
      },
      nonSignalling: {
        background: "linear-gradient(45deg, rgba(209,0,0,1) 0%, rgba(89,0,0,1) 100%)",
      },
      upcoming: {
        background: "transparent",
        border: "1px solid #5a5a5a",
      },
    },
  },
  textColor: "",
  textShadowColor: "#000",
};
