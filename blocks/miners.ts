export interface IMinerData {
  [key: string]: {
    name: string;
    signals: boolean;
    website: string | undefined;
    numBlocks: number;
  };
}

export interface IMiners {
  coinbase_tags: {
    [key: string]: {
      name: string;
      link: string;
    };
  };
  payout_addresses: {
    [key: string]: {
      name: string;
      link: string;
    };
  };
}

// Copied from https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json
const miners: IMiners = {
  coinbase_tags: {
    "/LUXOR/": {
      name: "Luxor",
      link: "https://mining.luxor.tech",
    },
    "/1THash&58COIN/": {
      name: "1THash",
      link: "https://www.1thash.top",
    },
    "/1THash/": {
      name: "1THash",
      link: "https://www.1thash.top",
    },
    "/BTC.COM/": {
      name: "BTC.com",
      link: "https://pool.btc.com",
    },
    "/BTC.com/": {
      name: "BTC.com",
      link: "https://pool.btc.com",
    },
    BITFARMS: {
      name: "Bitfarms",
      link: "https://www.bitarms.io/",
    },
    "/Huobi/": {
      name: "Huobi.pool",
      link: "https://www.hpt.com/",
    },
    "/HuoBi/": {
      name: "Huobi.pool",
      link: "https://www.hpt.com/",
    },
    "/E2M & BTC.TOP/": {
      name: "WAYI.CN",
      link: "http://www.easy2mine.com/",
    },
    "/canoepool/": {
      name: "CanoePool",
      link: "https://www.canoepool.com/",
    },
    "/BTC.TOP/": {
      name: "BTC.TOP",
      link: "http://www.btc.top/",
    },
    "pool.bitcoin.com": {
      name: "Bitcoin.com",
      link: "https://www.bitcoin.com/",
    },
    "Mined By 175btc.com": {
      name: "175btc",
      link: "http://www.175btc.com/",
    },
    "/mined by gbminers/": {
      name: "GBMiners",
      link: "http://gbminers.com/",
    },
    "/A-XBT/": {
      name: "A-XBT",
      link: "http://www.a-xbt.com",
    },
    ASICMiner: {
      name: "ASICMiner",
      link: "http://www.asicminer.co",
    },
    BitMinter: {
      name: "BitMinter",
      link: "https://bitminter.com/",
    },
    "/Bitcoin-Russia.ru/": {
      name: "BitcoinRussia",
      link: "https://bitcoin-russia.ru",
    },
    btcserv: {
      name: "BTCServ",
      link: "http://btcserv.net/",
    },
    simplecoin: {
      name: "simplecoin.us",
      link: "http://simplecoin.us/",
    },
    "BTC Guild": {
      name: "BTC Guild",
      link: "http://www.btcguild.com/",
    },
    Eligius: {
      name: "Eligius",
      link: "http://eligius.st/",
    },
    "ozco.in": {
      name: "OzCoin",
      link: "http://ozcoin.net/",
    },
    ozcoin: {
      name: "OzCoin",
      link: "http://ozcoin.net/",
    },
    EMC: {
      name: "EclipseMC",
      link: "https://eclipsemc.com/",
    },
    MaxBTC: {
      name: "MaxBTC",
      link: "http://maxbtc.com/",
    },
    triplemining: {
      name: "TripleMining",
      link: "https://www.triplemining.com/",
    },
    "Triplemining.com": {
      name: "TripleMining",
      link: "https://www.triplemining.com/",
    },
    CoinLab: {
      name: "CoinLab",
      link: "http://coinlab.com/",
    },
    "50BTC": {
      name: "50BTC",
      link: "https://www.50btc.com/",
    },
    "ghash.io": {
      name: "GHash.IO",
      link: "https://ghash.io/",
    },
    "st mining corp": {
      name: "ST Mining Corp",
      link: "https://bitcointalk.org/index.php?topic=77000.msg3207708#msg3207708",
    },
    bitparking: {
      name: "Bitparking",
      link: "http://mmpool.bitparking.com/",
    },
    mmpool: {
      name: "mmpool",
      link: "http://mmpool.org/pool",
    },
    "by polmine.pl": {
      name: "Polmine",
      link: "https://polmine.pl/",
    },
    bypmneU: {
      name: "Polmine",
      link: "https://polmine.pl/",
    },
    KnCMiner: {
      name: "KnCMiner",
      link: "https://portal.kncminer.com/pool",
    },
    Bitalo: {
      name: "Bitalo",
      link: "https://bitalo.com/mining",
    },
    七彩神仙鱼: {
      name: "F2Pool",
      link: "https://www.f2pool.com/",
    },
    "🐟": {
      name: "F2Pool",
      link: "https://www.f2pool.com/",
    },
    HHTT: {
      name: "HHTT",
      link: "http://hhtt.1209k.com/",
    },
    "megabigpower.com": {
      name: "MegaBigPower",
      link: "http://megabigpower.com/",
    },
    "/mtred/": {
      name: "Mt Red",
      link: "https://mtred.com/",
    },
    "nmcbit.com": {
      name: "NMCbit",
      link: "http://nmcbit.com/",
    },
    "yourbtc.net": {
      name: "Yourbtc.net",
      link: "http://yourbtc.net/",
    },
    "Give-Me-Coins": {
      name: "Give Me Coins",
      link: "http://give-me-coins.com/",
    },
    "/slush/": {
      name: "SlushPool",
      link: "https://slushpool.com/",
    },
    "Mined by AntPool": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "Mined By AntPool": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "/AntPool/": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "Mined by MultiCoin.co": {
      name: "MultiCoin.co",
      link: "http://multicoin.co",
    },
    "bcpool.io": {
      name: "bcpool.io",
      link: "https://bcpool.io/",
    },
    cointerra: {
      name: "Cointerra",
      link: "http://cointerra.com/",
    },
    Kano: {
      name: "KanoPool",
      link: "https://kano.is/",
    },
    "/solo.ckpool.org/": {
      name: "Solo CK",
      link: "http://solo.ckpool.org/",
    },
    "/ckpool.org/": {
      name: "CKPool",
      link: "http://ckpool.org",
    },
    "/NiceHashSolo": {
      name: "NiceHash",
      link: "https://solo.nicehash.com/",
    },
    "/BitClub Network/": {
      name: "BitClub",
      link: "https://bitclubpool.com/",
    },
    "bitcoinaffiliatenetwork.com": {
      name: "Bitcoin Affiliate Network",
      link: "https://mining.bitcoinaffiliatenetwork.com/",
    },
    "BTCChina Pool": {
      name: "BTCC",
      link: "https://pool.btcc.com/",
    },
    "btcchina.com": {
      name: "BTCC",
      link: "https://pool.btcc.com/",
    },
    "BTCChina.com": {
      name: "BTCC",
      link: "https://pool.btcc.com/",
    },
    "/BTCC/": {
      name: "BTCC",
      link: "https://pool.btcc.com/",
    },
    "BW Pool": {
      name: "BWPool",
      link: "https://bwpool.net/",
    },
    BWPool: {
      name: "BWPool",
      link: "https://bwpool.net/",
    },
    "xbtc.exx.com&bw.com": {
      name: "EXX&BW",
      link: "https://xbtc.exx.com/",
    },
    "Bitsolo Pool": {
      name: "Bitsolo",
      link: "http://bitsolo.net/",
    },
    "/BitFury/": {
      name: "BitFury",
      link: "http://bitfury.com/",
    },
    "/Bitfury/": {
      name: "BitFury",
      link: "http://bitfury.com/",
    },
    "/pool34/": {
      name: "21 Inc.",
      link: "https://21.co/",
    },
    "/agentD/": {
      name: "digitalBTC",
      link: "http://digitalbtc.com/",
    },
    "/八宝池 8baochi.com/": {
      name: "8baochi",
      link: "http://8baochi.com/",
    },
    "myBTCcoin Pool": {
      name: "myBTCcoin Pool",
      link: "http://mybtccoin.com/",
    },
    TBDice: {
      name: "TBDice",
      link: "http://tbdice.org/",
    },
    HASHPOOL: {
      name: "HASHPOOL",
      link: "http://hashpool.com/",
    },
    "/Nexious/": {
      name: "Nexious",
      link: "https://nexious.com/",
    },
    "/bravo-mining/": {
      name: "Bravo Mining",
      link: "http://www.bravo-mining.com/",
    },
    "/HotPool/": {
      name: "HotPool",
      link: "https://hotpool.co/",
    },
    "/www.okex.com/": {
      name: "OKExPool",
      link: "https://www.okex.com/",
    },
    "/BCMonster/": {
      name: "BCMonster",
      link: "http://www.bcmonster.com/",
    },
    "Mined by 1hash.com": {
      name: "1Hash",
      link: "http://www.1hash.com/",
    },
    "/HaoBTC/": {
      name: "Bixin",
      link: "https://haopool.com/",
    },
    HAOBTC: {
      name: "Bixin",
      link: "https://haopool.com/",
    },
    "/Bixin/": {
      name: "Bixin",
      link: "https://haopool.com/",
    },
    "/ViaBTC/TATMAS Pool/": {
      name: "TATMAS Pool",
      link: "https://tmsminer.com/",
    },
    "viabtc.com deploy": {
      name: "ViaBTC",
      link: "https://viabtc.com",
    },
    "/ViaBTC/": {
      name: "ViaBTC",
      link: "http://viabtc.com/",
    },
    "/ConnectBTC - Home for Miners/": {
      name: "ConnectBTC",
      link: "https://www.connectbtc.com/",
    },
    "/BATPOOL/": {
      name: "BATPOOL",
      link: "https://www.batpool.com/",
    },
    "/CANOE/": {
      name: "CanoePool",
      link: "https://btc.canoepool.com/",
    },
    "/WATERHOLE.IO/": {
      name: "Waterhole",
      link: "https://btc.waterhole.io/",
    },
    "/DCExploration/": {
      name: "DCExploration",
      link: "http://dcexploration.cn",
    },
    "/DCEX/": {
      name: "DCEX",
      link: "http://dcexploration.cn",
    },
    "/BTPOOL/": {
      name: "BTPOOL",
      link: "",
    },
    "/58coin.com/": {
      name: "58COIN",
      link: "https://www.58coin.com",
    },
    "/Bitcoin-India/": {
      name: "Bitcoin India",
      link: "https://bitcoin-india.org",
    },
    "--Nug--": {
      name: "shawnp0wers",
      link: "https://www.brainofshawn.com",
    },
    "/phash.io/": {
      name: "PHash.IO",
      link: "http://phash.io",
    },
    "/phash.cn/": {
      name: "PHash.IO",
      link: "http://phash.io",
    },
    "/RigPool.com/": {
      name: "RigPool",
      link: "https://www.rigpool.com",
    },
    "/haozhuzhu/": {
      name: "HAOZHUZHU",
      link: "http://haozhuzhu.com/",
    },
    "/$Mined by 7pool.com/": {
      name: "7pool",
      link: "https://7pool.com/",
    },
    "/mined by poopbut/": {
      name: "MiningKings",
      link: "https://miningkings.com/",
    },
    "/Mined by HashBX.io/": {
      name: "HashBX",
      link: "https://hashbx.io",
    },
    "/DPOOL.TOP/": {
      name: "DPOOL",
      link: "http://www.dpool.top/",
    },
    "/Rawpool.com/": {
      name: "Rawpool.com",
      link: "https://www.rawpool.com/",
    },
    "/haominer/": {
      name: "haominer",
      link: "http://haominer.com/",
    },
    "/Helix/": {
      name: "Helix",
      link: "",
    },
    "/Bitcoin-Ukraine.com.ua/": {
      name: "Bitcoin-Ukraine",
      link: "https://bitcoin-ukraine.com.ua/",
    },
    "/poolin.com": {
      name: "Poolin",
      link: "https://www.poolin.com/",
    },
    "/SecretSuperstar/": {
      name: "SecretSuperstar",
      link: "",
    },
    "/tigerpool.net": {
      name: "tigerpool.net",
      link: "",
    },
    "/Sigmapool.com/": {
      name: "Sigmapool.com",
      link: "https://sigmapool.com",
    },
    "/www.okpool.top/": {
      name: "okpool.top",
      link: "https://www.okpool.top",
    },
    HummerPool: {
      name: "Hummerpool",
      link: "https://www.hummerpool.com",
    },
    Hummerpool: {
      name: "Hummerpool",
      link: "https://www.hummerpool.com",
    },
    "/Tangpool/": {
      name: "Tangpool",
      link: "http://www.tangpool.com/",
    },
    "/bytepool.com/": {
      name: "BytePool",
      link: "https://www.bytepool.com/",
    },
    "/SpiderPool/": {
      name: "SpiderPool",
      link: "https://www.spiderpool.com/",
    },
    "/NovaBlock/": {
      name: "NovaBlock",
      link: "https://novablock.com",
    },
    MiningCity: {
      name: "MiningCity",
      link: "https://www.miningcity.com/",
    },
    "/Binance/": {
      name: "Binance Pool",
      link: "https://pool.binance.com/",
    },
    "/Minerium.com/": {
      name: "Minerium",
      link: "https://www.minerium.com/",
    },
    "/Buffett/": {
      name: "Lubian.com",
      link: "",
    },
    "/lubian.com/": {
      name: "Lubian.com",
      link: "http://www.lubian.com/",
    },
    "/hash.okkong.com/": {
      name: "OKKONG",
      link: "https://hash.okkong.com",
    },
    "/TMSPOOL/": {
      name: "TMSPool",
      link: "https://btc.tmspool.top",
    },
    "/one_more_mcd/": {
      name: "EMCDPool",
      link: "https://pool.emcd.io",
    },
    "/Foundry USA Pool #dropgold/": {
      name: "Foundry USA",
      link: "https://foundrydigital.com/",
    },
    "/2cDw/": {
      name: "Foundry USA",
      link: "https://foundrydigital.com/",
    },
    "/SBICrypto.com Pool/": {
      name: "SBI Crypto",
      link: "https://sbicrypto.com",
    },
    "SBI Crypto": {
      name: "SBI Crypto",
      link: "https://www.sbicrypto.com",
    },
    SBICrypto: {
      name: "SBI Crypto",
      link: "https://www.sbicrypto.com",
    },
    "/ArkPool/": {
      name: "ArkPool",
      link: "https://www.arkpool.com/",
    },
    "/PureBTC.COM/": {
      name: "PureBTC.COM",
      link: "https://purebtc.com",
    },
  },
  payout_addresses: {
    "3Bmb9Jig8A5kHdDSxvDZ6eryj3AXd3swuJ": {
      name: "NovaBlock",
      link: "https://novablock.com",
    },
    "3GvEGtnvgeBJ3p3EpdZhvUkxY4pDARkbjd": {
      name: "Bitfarms",
      link: "https://www.bitfarms.io/",
    },
    "1CjPR7Z5ZSyWk6WtXvSFgkptmpoi4UM9BC": {
      name: "GHash.IO",
      link: "https://ghash.io/",
    },
    "14R2r9FkyDmyxGB9xUVwVLdgsX9YfdVamk": {
      name: "BitcoinRussia",
      link: "https://bitcoin-russia.ru/",
    },
    "165GCEAx81wce33FWEnPCRhdjcXCrBJdKn": {
      name: "BitcoinRussia",
      link: "https://bitcoin-russia.ru/",
    },
    "17kkmDx8eSwj2JTTULb3HkJhCmexfysExz": {
      name: "Polmine",
      link: "https://polmine.pl/",
    },
    "1AajKXkaq2DsnDmP8ZPTrE5gH1HFo1x3AU": {
      name: "Polmine",
      link: "https://polmine.pl/",
    },
    "16cv7wyeG6RRqhvJpY21CnsjxuKj2gAoK2": {
      name: "Polmine",
      link: "https://polmine.pl/",
    },
    "13vWXwzNF5Ef9SUXNTdr7de7MqiV4G1gnL": {
      name: "Polmine",
      link: "https://polmine.pl/",
    },
    "1Nsvmnv8VcTMD643xMYAo35Aco3XA5YPpe": {
      name: "Polmine",
      link: "https://polmine.pl/",
    },
    "1JrYhdhP2jCY6JwuVzdk9jUwc4pctcSes7": {
      name: "Polmine",
      link: "https://polmine.pl/",
    },
    "1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE": {
      name: "SlushPool",
      link: "https://slushpool.com/",
    },
    "1AqTMY7kmHZxBuLUR5wJjPFUvqGs23sesr": {
      name: "SlushPool",
      link: "https://slushpool.com/",
    },
    "1AcAj9p6zJn4xLXdvmdiuPCtY7YkBPTAJo": {
      name: "BitFury",
      link: "http://bitfury.com/",
    },
    "1BX5YoLwvqzvVwSrdD4dC32vbouHQn2tuF": {
      name: "Cointerra",
      link: "http://cointerra.com/",
    },
    "19PkHafEN18mquJ9ChwZt5YEFoCdPP5vYB": {
      name: "BitMinter",
      link: "http://bitminter.com/",
    },
    "15xiShqUqerfjFdyfgBH1K7Gwp6cbYmsTW ": {
      name: "EclipseMC",
      link: "https://eclipsemc.com/",
    },
    "1BwZeHJo7b7M2op7VDfYnsmcpXsUYEcVHm": {
      name: "BTC Nuggets",
      link: "http://104.197.8.250/",
    },
    "1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY": {
      name: "F2Pool",
      link: "https://www.f2pool.com/",
    },
    "3HuobiNg2wHjdPU2mQczL9on8WF7hZmaGd": {
      name: "Huobi.pool",
      link: "https://www.hpt.com/",
    },
    "18Zcyxqna6h7Z7bRjhKvGpr8HSfieQWXqj": {
      name: "Huobi.pool",
      link: "https://www.hpt.com/",
    },
    "1EepjXgvWUoRyNvuLSAxjiqZ1QqKGDANLW": {
      name: "Huobi.pool",
      link: "https://www.hpt.com/",
    },
    "1MvYASoHjqynMaMnP7SBmenyEWiLsTqoU6": {
      name: "Huobi.pool",
      link: "https://www.hpt.com/",
    },
    "1ALA5v7h49QT7WYLcRsxcXqXUqEqaWmkvw": {
      name: "CloudHashing",
      link: "https://cloudhashing.com/",
    },
    "1K7znxRfkS8R1hcmyMvHDum1hAQreS4VQ4": {
      name: "MegaBigPower",
      link: "https://megabigpower.com",
    },
    "1HTejfsPZQGi3afCMEZTn2xdmoNzp13n3F": {
      name: "Bitalo",
      link: "https://bitalo.com/mining",
    },
    "1JLRXD8rjRgQtTS9MvfQALfHgGWau9L9ky": {
      name: "BWPool",
      link: "https://bwpool.net/",
    },
    "18zRehBcA2YkYvsC7dfQiFJNyjmWvXsvon": {
      name: "Bitsolo",
      link: "http://bitsolo.net/",
    },
    "155fzsEBHy9Ri2bMQ8uuuR3tv1YzcDywd4": {
      name: "BitClub",
      link: "https://bitclubpool.com/",
    },
    "14yfxkcpHnju97pecpM7fjuTkVdtbkcfE6": {
      name: "BitFury",
      link: "http://bitfury.com/",
    },
    "15rQXUSBQRubShPpiJfDLxmwS8ze2RUm4z": {
      name: "21 Inc.",
      link: "https://21.co/",
    },
    "1CdJi2xRTXJF6CEJqNHYyQDNEcM3X7fUhD": {
      name: "21 Inc.",
      link: "https://21.co/",
    },
    "1GC6HxDvnchDdb5cGkFXsJMZBFRsKAXfwi": {
      name: "21 Inc.",
      link: "https://21.co/",
    },
    "1MimPd6LrPKGftPRHWdfk8S3KYBfN4ELnD": {
      name: "digitalBTC",
      link: "http://digitalbtc.com/",
    },
    "1NY15MK947MLzmPUa2gL7UgyR8prLh2xfu": {
      name: "digitalX Mintsy",
      link: "https://www.mintsy.co/",
    },
    "1P4B6rx1js8TaEDXvZvtrkiEb9XrJgMQ19": {
      name: "Telco 214",
      link: "http://www.telco214.com/",
    },
    "1MoYfV4U61wqTPTHCyedzFmvf2o3uys2Ua": {
      name: "Telco 214",
      link: "http://www.telco214.com/",
    },
    "1GaKSh2t396nfSg5Ku2J3Yn1vfVsXrGuH5": {
      name: "Telco 214",
      link: "http://www.telco214.com/",
    },
    "1AsEJU4ht5wR7BzV6xsNQpwi5qRx4qH1ac": {
      name: "Telco 214",
      link: "http://www.telco214.com/",
    },
    "18ikmzPqk721ZNvWhDos1UL4H29w352Kj5": {
      name: "Telco 214",
      link: "http://www.telco214.com/",
    },
    "1DXRoTT67mCbhdHHL1it4J1xsSZHHnFxYR": {
      name: "Telco 214",
      link: "http://www.telco214.com/",
    },
    "152f1muMCNa7goXYhYAQC61hxEgGacmncB": {
      name: "BTCC",
      link: "https://pool.btcc.com/",
    },
    "1PmRrdp1YSkp1LxPyCfcmBHDEipG5X4eJB": {
      name: "BTC Pool Party",
      link: "https://btcpoolparty.com/",
    },
    "1Hk9gD8xMo2XBUhE73y5zXEM8xqgffTB5f": {
      name: "8baochi",
      link: "http://8baochi.com/",
    },
    "151T7r1MhizzJV6dskzzUkUdr7V8JxV2Dx": {
      name: "myBTCcoin Pool",
      link: "http://www.mybtccoin.com/",
    },
    "1MFsp2txCPwMMBJjNNeKaduGGs8Wi1Ce7X": {
      name: "A-XBT",
      link: "http://www.a-xbt.com/",
    },
    "1BUiW44WuJ2jiJgXiyxJVFMN8bc1GLdXRk": {
      name: "TBDice",
      link: "http://tbdice.org/",
    },
    "1MeffGLauEj2CZ18hRQqUauTXb9JAuLbGw": {
      name: "Multipool",
      link: "https://www.multipool.us/",
    },
    "1qtKetXKgqa7j1KrB19HbvfRiNUncmakk": {
      name: "transactioncoinmining",
      link: "http://sha256.transactioncoinmining.com/",
    },
    "15MxzsutVroEE9XiDckLxUHTCDAEZgPZJi": {
      name: "BTCDig",
      link: "https://btcdig.com/",
    },
    "1GBo1f2tzVx5jScV9kJXPUP9RjvYXuNzV7": {
      name: "Nexious",
      link: "https://nexious.com/",
    },
    "1AePMyovoijxvHuKhTqWvpaAkRCF4QswC6": {
      name: "Tricky's BTC Pool",
      link: "http://pool.wemine.uk/",
    },
    "17judvK4AC2M6KhaBbAEGw8CTKc9Pg8wup": {
      name: "HotPool",
      link: "https://hotpool.co/",
    },
    "1jKSjMLnDNup6NPgCjveeP9tUn4YpT94Y": {
      name: "BTCMP",
      link: "https://www.btcmp.com/",
    },
    "1MPxhNkSzeTNTHSZAibMaS8HS1esmUL1ne": {
      name: "Eobot",
      link: "https://eobot.com/",
    },
    "16GsNC3q6KgVXkUX7j7aPxSUdHrt1sN2yN": {
      name: "Eobot",
      link: "https://eobot.com",
    },
    "1F1xcRt8H8Wa623KqmkEontwAAVqDSAWCV": {
      name: "1Hash",
      link: "http://www.1hash.com/",
    },
    "1BRY8AD7vSNUEE75NjzfgiG18mWjGQSRuJ": {
      name: "UNOMP",
      link: "http://199.115.116.7:8925/",
    },
    "19RE4mz2UbDxDVougc6GGdoT4x5yXxwFq2": {
      name: "Patels",
      link: "http://patelsminingpool.com/",
    },
    "197miJmttpCt2ubVs6DDtGBYFDroxHmvVB": {
      name: "Patels",
      link: "http://patelsminingpool.com/",
    },
    "3NA8hsjfdgVkmmVS9moHmkZsVCoLxUkvvv": {
      name: "BTC.com",
      link: "https://pool.btc.com",
    },
    "34qkc2iac6RsyxZVfyE2S5U5WcRsbg2dpK": {
      name: "BTC.com",
      link: "https://pool.btc.com",
    },
    "3EhLZarJUNSfV6TWMZY1Nh5mi3FMsdHa5U": {
      name: "BTC.com",
      link: "https://pool.btc.com",
    },
    bc1qjl8uwezzlech723lpnyuza0h2cdkvxvh54v3dn: {
      name: "BTC.com",
      link: "https://pool.btc.com",
    },
    "1Bf9sZvBHPFGVPX71WX2njhd1NXKv5y7v5": {
      name: "BTC.com",
      link: "https://pool.btc.com",
    },
    "18EPLvrs2UE11kWBB3ABS7Crwj5tTBYPoa": {
      name: "GoGreenLight",
      link: "http://www.gogreenlight.se/",
    },
    "1KPQkehgYAqwiC6UCcbojM3mbGjURrQJF2": {
      name: "ConnectBTC",
      link: "https://www.connectbtc.com/",
    },
    "167ApWWxUSFQmz2jdz9xop3oAKdLejvMML": {
      name: "BATPOOL",
      link: "https://www.batpool.com/",
    },
    "1KsFhYKLs8qb1GHqrPxHoywNQpet2CtP9t": {
      name: "Bixin",
      link: "https://haopool.com/",
    },
    "13hQVEstgo4iPQZv9C7VELnLWF7UWtF4Q3": {
      name: "Bixin",
      link: "https://haopool.com/",
    },
    "19qa95rTbDziNCS9EexUbh2hVY4viUU9tt": {
      name: "HAOZHUZHU",
      link: "http://haozhuzhu.com",
    },
    "1AZ6BkCo4zgTuuLpRStJH8iNsehXTMp456": {
      name: "BitcoinIndia",
      link: "https://pool.bitcoin-india.org/",
    },
    "1FLH1SoLv4U68yUERhDiWzrJn5TggMqkaZ": {
      name: "Waterhole",
      link: "https://btc.waterhole.io/",
    },
    "1GP8eWArgpwRum76saJS4cZKCHWJHs9PQo": {
      name: "CanoePool",
      link: "https://btc.canoepool.com/",
    },
    "199EDJoCpqV672qESEkfFgEqNT1iR2gj3t": {
      name: "58COIN",
      link: "https://www.58coin.com/",
    },
    "1Cs5RT9SRk1hxsdzivAfkjesNmVVJqfqkw": {
      name: "EkanemBTC",
      link: "https://ekanembtc.com/",
    },
    "13Sd8Y7nUao3z4bJFkZvCRXpFqHvLy49YY": {
      name: "Telco 214",
      link: "http://www.telco214.com",
    },
    "18hvMLisvfc58PvA5rHH7NsLN9CV5ddB2x": {
      name: "Telco 214",
      link: "http://www.telco214.com",
    },
    "1BUhwvF9oo3qkaSjjPpWrUzQxXNjkHdMZF": {
      name: "Telco 214",
      link: "http://www.telco214.com",
    },
    "1CNq2FAw6S5JfBiDkjkYJUVNQwjoeY4Zfi": {
      name: "Telco 214",
      link: "http://www.telco214.com",
    },
    "1LXWA3EEEwPixQcyFWXKX2hWHpkDoLknZW": {
      name: "Telco 214",
      link: "http://www.telco214.com",
    },
    "14M1pQ5KKeqmDrmqKyZEnaxAGJfBPrfWvQ": {
      name: "Telco 214",
      link: "http://www.telco214.com",
    },
    "12znnESiJ3bgCLftwwrg9wzQKN8fJtoBDa": {
      name: "shawnp0wers",
      link: "https://www.brainofshawn.com",
    },
    "18HEMWFXM9UGPVZHUMdBPD3CMFWYn2NPRX": {
      name: "shawnp0wers",
      link: "https://www.brainofshawn.com",
    },
    "1Hz96kJKF2HLPGY15JWLB5m9qGNxvt8tHJ": {
      name: "BTC.TOP",
      link: "http://btc.top",
    },
    "1Afcpc2FpPnREU6i52K3cicmHdvYRAH9Wo": {
      name: "CANOE",
      link: "https://www.canoepool.com",
    },
    "1JpKmtspBJQVXK67DJP64eBJcAPhDvJ9Er": {
      name: "RigPool",
      link: "https://www.rigpool.com",
    },
    "1E18BNyobcoiejcDYAz5SjbrzifNDEpM88": {
      name: "BCMonster",
      link: "http://www.bcmonster.com",
    },
    "1JLc3JxvpdL1g5zoX8sKLP4BkJQiwnJftU": {
      name: "7pool",
      link: "https://7pool.com/",
    },
    "1EowSPumj9D9AMTpE64Jr7vT3PJDNopVcz": {
      name: "MiningKings",
      link: "https://miningkings.com/",
    },
    "1ApE99VM5RJzMRRtwd2JMgmkGabtJqoMEz": {
      name: "MiningKings",
      link: "https://miningkings.com/",
    },
    "1KGbsDDAgJN2HDNBjmMHp9828qATo5B9c9": {
      name: "MiningKings",
      link: "https://miningkings.com/",
    },
    "1ACAgPuFFidYzPMXbiKptSrwT74Dg8hq2v": {
      name: "DPOOL",
      link: "http://www.dpool.top/",
    },
    "1FbBbv5oYqFKwiPm4CAqvAy8345n8AQ74b": {
      name: "Rawpool.com",
      link: "https://www.rawpool.com/",
    },
    "1LsFmhnne74EmU4q4aobfxfrWY4wfMVd8w": {
      name: "tiger",
      link: "",
    },
    "36n452uGq1x4mK7bfyZR8wgE47AnBb2pzi": {
      name: "Poolin",
      link: "https://www.poolin.com/",
    },
    "3KJrsjfg1dD6CrsTeHdHVH3KqMpvL2XWQn": {
      name: "Poolin",
      link: "https://www.poolin.com/",
    },
    "3JQSigWTCHyBLRD979JWgEtWP5YiiFwcQB": {
      name: "Poolin",
      link: "https://www.poolin.com/",
    },
    "12Taz8FFXQ3E2AGn3ZW1SZM5bLnYGX4xR6": {
      name: "Tangpool",
      link: "http://www.tangpool.com/",
    },
    "1M1Xw2rczxkF3p3wiNHaTmxvbpZZ7M6vaa": {
      name: "1M1X",
      link: "",
    },
    "39m5Wvn9ZqyhYmCYpsyHuGMt5YYw4Vmh1Z": {
      name: "BytePool",
      link: "https://www.bytepool.com/",
    },
    "38u1srayb1oybVB43UWKBJsrwJbdHGtPx2": {
      name: "SpiderPool",
      link: "https://www.spiderpool.com/",
    },
    "125m2H43pwKpSZjLhMQHneuTwTJN5qRyYu": {
      name: "SpiderPool",
      link: "https://www.spiderpool.com/",
    },
    "1Sjj2cPC3rTWcSTEYDeu2f3BavLosog4T": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1jLVpwtNMfXWaHY4eiLDmGuBxokYLgv1X": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "15kiNKfDWsq7UsPg87UwxA8rVvWAjzRkYS": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "16MdTdqmXusauybtXTmFEW4GNFPPgGxQYE": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "16kUc5B48qnASbxeZTisCqTNx6G3DPXuKn": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "17gVZssumiJqYMCHozHKXGyaAvyu6NCX6V": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1AJQ3jXhUF8WiisEcuVd8Xmfq4QJ7n1SdL": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1BWW3pg5jb6rxebrNeo9TATarwJ1rthnoe": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1CBqo1w3hmm9SCmbu2Yg6Ls4uLfkUqZJsx": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1CyB8GJNEsNVXtPutB36nrDY3fMXBTzXSX": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1D4UZG4qo8bF1MuZHSEyBHRZaxT8inatXS": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1Dek9ArRHb9tyWb9gaaX8SWmkfi5V7U5Y6": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1DDXyKUT6q3H9e5QXm2Gv6BNNWgztFG55g": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1DyR7HPQWjM6Zrnk7SzHVY2GEpXRGNNH9o": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1B7ZBX2C39b26M9chHLURGSFTJA6DDQkZv": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1NS4gbx1G2D5rc9PnvVsPys12nKxGiQg72": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1KmgBTL7cFmFFYTD7HcdkMcZXRcTkh2WwS": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1Nh7uHdvY6fNwtQtM1G5EZAFPLC33B59rB": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1LTGvTjDxiy5S9YcKEE9Lb7xSpZcPSqinw": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1K8PNogxBZ6ts532DZnzxdbjgzJLjLdXqz": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1JwUDWVSbAY5NeCBJhxQk1E8AfETfZuPj4": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1JBVrhSSDrZrRmm4RnoWouqgGGqJMvWHi8": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1H3u6R813MHGYhmGW6v86EYYriawRtACYD": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1Gp7iCzDGMZiV55Kt8uKsux6VyoHe1aJaN": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1GRcX882sdBYCAWyG99iF2oz7j3nYzXhLM": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1FdJkPdpXtK3t5utZHJAop3saLZWfPfgak": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "12dRugNcdxK39288NjcDV4GX7rMsKCGn6B": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1CZHhV67Qos4xXb8uYqvAGjK8Wq52woPi5": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1Pzf7qT7bBGouvnjRvtRD8VhTyqjX1NrJT": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "3FaYVQF6wCMUB9NCeRe4tUp1zZx8qqM7H1": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1MiQrT5sEKTUGNMbd9WS3yPPkSjWdpYA2r": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1H6ckqNWikmVT3wpN3X1BQ6b156Xc9nT2L": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1GT2N4dCufvbnTKMbS61QrQPN4SexCAFiH": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1GEG1JR81jvUXs7TMAuo3SPBHZrpJijcjt": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1FrHkVsW7csAYYaRbUUcrKSmv91hcQnsqQ": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1DQaDTefKPjHz3beLuo8KHRZF9t2Sc6foP": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "1D9jw3QHNankXxtcGVihsDK7Z7THN6j7Pg": {
      name: "AntPool",
      link: "https://www.antpool.com/",
    },
    "12cKiMNhCtBhZRUBCnYXo8A4WQzMUtYjmR": {
      name: "Sigmapool.com",
      link: "https://sigmapool.com/",
    },
    "16JHXJ7M2MubWNX9grnqbjUqJ5PHwcCWw2": {
      name: "OKKONG",
      link: "https://hash.okkong.com/",
    },
    "11wC5KcbgrWRBb43cwADdVrxgyF8mndVC": {
      name: "MiningCity",
      link: "https://www.miningcity.com/",
    },
    "1DSh7vX6ed2cgTeKPwufV5i4hSi4pp373h": {
      name: "Binance Pool",
      link: "https://pool.binance.com/",
    },
    "16moWjUJVRnDQKqhoCdcszfJg9wzBdoTHw": {
      name: "Binance Pool",
      link: "https://pool.binance.com/",
    },
    bc1qx9t2l3pyny2spqpqlye8svce70nppwtaxwdrp4: {
      name: "Binance Pool",
      link: "https://pool.binance.com/",
    },
    "34Jpa4Eu3ApoPVUKNTN2WeuXVVq1jzxgPi": {
      name: "Lubian.com",
      link: "http://www.lubian.com/",
    },
    "1FFxkVijzvUPUeHgkFjBk2Qw8j3wQY2cDw": {
      name: "Foundry USA",
      link: "https://foundrydigital.com/",
    },
    "1QEiAhdHdMhBgVbDM7zUXWGkNhgEEJ6uLd": {
      name: "ArkPool",
      link: "https://www.arkpool.com/",
    },
    "147SwRQdpCfj5p8PnfsXV2SsVVpVcz3aPq": {
      name: "1THash",
      link: "https://www.1thash.top",
    },
    "15vgygQ7ZsWdvZpctmTZK4673QBHsos6Sh": {
      name: "1THash",
      link: "https://www.1thash.top",
    },
    bc1qnnl503n04cqacpwvhr89qr70metxr79ht3n380: {
      name: "Rawpool",
      link: "https://www.rawpool.com",
    },
    bc1qwlrsvgtn99rqp3fgaxq6f6jkgms80rnej0a8tc: {
      name: "Rawpool",
      link: "https://www.rawpool.com",
    },
    bc1q8ej2g5uxdsg0jwl0mpl606qfjxgkyv3p29yf37: {
      name: "Rawpool",
      link: "https://www.rawpool.com",
    },
    bc1qru8mtv3e3u7ms6ecjmwgeakdakclemvhnw00q9: {
      name: "Rawpool",
      link: "https://www.rawpool.com",
    },
    "3QYvfQoG9Gs9Vfvbpw6947muSqhoGagvF6": {
      name: "Rawpool",
      link: "https://www.rawpool.com",
    },
    "35y82tEPDa2wm6tzkEacMG8GPPW7zbMj83": {
      name: "Rawpool",
      link: "https://www.rawpool.com",
    },
    "3CLigLYNkrtoNgNcUwTaKoUSHCwr9W851W": {
      name: "Rawpool",
      link: "https://www.rawpool.com",
    },
  },
};

export default miners;
