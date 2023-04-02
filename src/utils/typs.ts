export interface ICOEngineDetail {
    ICOEnded: boolean;
    MATICBalance: number;

    depositPrivate: number;
    claimPrivate: number;
    totalDepositPrivate: number;
    pricePrivate: number;
    maxContributePrivate: number;
    startTimestampPrivate: number;
    endTimestampPrivate: number;
    hardcapPrivate: number;

    depositPresale: number;
    claimPresale: number;
    totalDepositPresale: number;
    pricePresale: number;
    maxContributePresale: number;
    startTimestampPresale: number;
    endTimestampPresale: number;
    hardcapPresale: number;

    depositPublic: number;
    claimPublic: number;
    totalDepositPublic: number;
    pricePublic: number;
    maxContributePublic: number;
    startTimestampPublic: number;
    endTimestampPublic: number;
    hardcapPublic: number;
}

