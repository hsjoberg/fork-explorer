export interface ITheme {
  backgroundColor: string;
  textColor: string;
  textShadowColor: string;
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
        backgroundSize: string;
        after: string;
      };
      nonSignalling: {
        background: string;
        backgroundSize: string;
        after: string;
      };
      upcoming: {
        background: string;
        border: string;
      };
    };
  };
  progressBar: {
    container: {
      boxShadow: string;
    };
    progressBar: {
      signalling: {
        background: string;
        border: string;
      };
      nonSignalling: {
        background: string;
        border: string;
      };
      upcoming: {
        background: string;
        border: string;
      };
    };
  };
  stats: {
    primaryColor: string;
    labelColor: string;
  };
  activationCountdown: {
    countdownTimeColor: string;
  };
}

export const defaultTheme: ITheme = {
  backgroundColor: "#242424",
  textColor: "#f7f7f7",
  textShadowColor: "#000",
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
      backgroundColor: "#404040",
      boxShadow: "#000 3px 3px 14px",
    },
    block: {
      signalling: {
        background: "linear-gradient(45deg, rgba(18,209,0,1) 0%, rgba(9,89,0,1) 100%)",
        backgroundSize: "cover",
        after: "",
      },
      nonSignalling: {
        background: "linear-gradient(45deg, rgba(209,0,0,1) 0%, rgba(89,0,0,1) 100%)",
        backgroundSize: "cover",
        after: "",
      },
      upcoming: {
        background: "transparent",
        border: "1px solid #5a5a5a",
      },
    },
  },
  progressBar: {
    container: {
      boxShadow: "rgb(0, 0, 0) 2px 2px 14px",
    },
    progressBar: {
      signalling: {
        background: "linear-gradient(45deg, #217f35 0%, rgba(9, 89, 0, 1) 100%)",
        border: "1px solid #1ed947",
      },
      nonSignalling: {
        background: "linear-gradient(45deg, #731212 0%, rgba(89, 0, 0, 1) 100%)",
        border: "1px solid #c30000",
      },
      upcoming: {
        background: "linear-gradient(45deg, #8e8e8e 0%, #afafaf 100%)",
        border: "1px solid #f7f7f7",
      },
    },
  },
  stats: {
    primaryColor: "#ff9b20",
    labelColor: "#f7f7f7",
  },
  activationCountdown: {
    countdownTimeColor: "#ffb151",
  },
};

export const colorBlindnessTheme: ITheme = {
  backgroundColor: "#111",
  textColor: "#fcfcfc",
  textShadowColor: "#000",
  mainHeader: {
    color: "#fff",
    textShadow: "#000 3px 3px 0px",
    txtLinkColor: "#ddd",
  },
  commonHeader: {
    color: "#fff",
    textShadow: "#000 2px 2px 0px",
  },
  menu: {
    itemColor: "#d5d5d5",
    itemTextShadow: "#000 2px 2px 0px",
  },
  block: {
    container: {
      backgroundColor: "#313131",
      boxShadow: "#000 3px 3px 14px",
    },
    block: {
      signalling: {
        background: "#1ac29c",
        backgroundSize: "cover",
        after: `&:after {
          content: "";
          width: 4px;
          height: 4px;
          display: block;
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 0.7);
          right: 2px;
          bottom: 2px;
          position: absolute;
        }`,
      },
      nonSignalling: {
        background: "#686969",
        backgroundSize: "cover",
        after: "",
      },
      upcoming: {
        background: "transparent",
        border: "1px solid #5a5a5a",
      },
    },
  },
  progressBar: {
    container: {
      boxShadow: "rgb(0, 0, 0) 2px 2px 14px",
    },
    progressBar: {
      signalling: {
        background: "#1ac29c",
        border: "1px solid #1ac29c",
      },
      nonSignalling: {
        background: "#686969",
        border: "1px solid #686969",
      },
      upcoming: {
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.1)",
      },
    },
  },
  stats: {
    primaryColor: "#1ac29c",
    labelColor: "#fcfcfc",
  },
  activationCountdown: {
    countdownTimeColor: "#fff",
  },
};

export const saltyRogerTheme: ITheme = {
  backgroundColor: "#242424",
  textColor: "#f7f7f7",
  textShadowColor: "#000",
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
      backgroundColor: "#404040",
      boxShadow: "#000 3px 3px 14px",
    },
    block: {
      signalling: {
        background: "linear-gradient(45deg, rgba(18,209,0,1) 0%, rgba(9,89,0,1) 100%)",
        backgroundSize: "cover",
        after: "",
      },
      nonSignalling: {
        background: "url(/assets/saltyroger.png)",
        backgroundSize: "cover",
        after: "",
      },
      upcoming: {
        background: "transparent",
        border: "1px solid #5a5a5a",
      },
    },
  },
  progressBar: {
    container: {
      boxShadow: "rgb(0, 0, 0) 2px 2px 14px",
    },
    progressBar: {
      signalling: {
        background: "linear-gradient(45deg, #217f35 0%, rgba(9, 89, 0, 1) 100%)",
        border: "1px solid #1ed947",
      },
      nonSignalling: {
        background: "linear-gradient(45deg, #731212 0%, rgba(89, 0, 0, 1) 100%)",
        border: "1px solid #c30000",
      },
      upcoming: {
        background: "linear-gradient(45deg, #8e8e8e 0%, #afafaf 100%)",
        border: "1px solid #f7f7f7",
      },
    },
  },
  stats: {
    primaryColor: "#ff9b20",
    labelColor: "#f7f7f7",
  },
  activationCountdown: {
    countdownTimeColor: "#ffb151",
  },
};
