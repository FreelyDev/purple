import { useEffect, useState } from 'react';
import StakingCard from './StakingCard';
import './tokenStaking.scss'
import { useWeb3React } from '@web3-react/core';
import { claimPrivate, claimPublic, claimPresale, contributePrivate, contributePublic, contributePresale, getICOEngineInfo } from 'utils/contracts';
import { ICOEngineDetail } from 'utils/typs';
import toast from 'react-hot-toast';

type LoadingType = {
    setIsLoading?(flag: boolean): void;
};
export default function TokenSale({ setIsLoading }: LoadingType) {
    const categoryTextPrivate = "Token Sale";
    const categoryTextPresale = "Pre-Sale (Round 2)";
    const categoryTextPublic = "Crowdsale (Round 3)";

    const [isCardLoading, setIsCardLoading] = useState(true)

    useEffect(() => {
        if (!isCardLoading ) {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }, [setIsLoading, isCardLoading]);

    const [loginStatus, setLoginStatus] = useState(false);
    const { connector, library, chainId, account, active } = useWeb3React();
    const [ICOEngineDetail, setICOEngineDetail] = useState<ICOEngineDetail>(null);

    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
    }, [connector, library, account, active, chainId]);

    useEffect(() => {
        getICOEngineInfo(account).then(
            (engineInfo: ICOEngineDetail) => {
                setICOEngineDetail(engineInfo);
            }
        );
    }, [account]);

    const contributeMATIC = async (category: string, amountOfMATIC: number) => {
        if (!loginStatus) {
            toast.error("Please connect wallet correctly!");
            return;
        }

        if (amountOfMATIC <= 0) {
            toast.error("Contribute amount should be over than 0");
            return;
        }

        const load_toast_id = toast.loading("Please wait for Contribute...");
        try {
            let bSuccess = false
            if (category === categoryTextPrivate) {
                bSuccess = await contributePrivate(chainId, library.getSigner(), account, amountOfMATIC);
            } else if (category === categoryTextPresale) {
                bSuccess = await contributePresale(chainId, library.getSigner(), account, amountOfMATIC);
            } else if (category === categoryTextPublic) {
                bSuccess = await contributePublic(chainId, library.getSigner(), account, amountOfMATIC);
            }

            if (bSuccess) {
                toast.success("Contribute Success!");
                setTimeout(() => {
                    getICOEngineInfo(account).then(
                        (engineInfo: ICOEngineDetail) => {
                            setICOEngineDetail(engineInfo);
                        }
                    );
                }, 3000);
            } else {
                toast.error("Contribute Failed!");
            }
        } catch (error) {
            toast.error("Contribute Failed!");
        }
        toast.dismiss(load_toast_id);
    };

    const claimSWCT = async (category: string) => {
        if (!loginStatus) {
            toast.error("Please connect wallet correctly!");
            return;
        }

        const load_toast_id = toast.loading("Please wait for Claim...");
        try {
            let bSuccess = false
            if (category === categoryTextPrivate) {
                bSuccess = await claimPrivate(chainId, library.getSigner());
            } else if (category === categoryTextPresale) {
                bSuccess = await claimPresale(chainId, library.getSigner());
            } else if (category === categoryTextPublic) {
                bSuccess = await claimPublic(chainId, library.getSigner());
            }

            if (bSuccess) {
                toast.success("Claim Success!");
                setTimeout(() => {
                    getICOEngineInfo(account).then(
                        (engineInfo: ICOEngineDetail) => {
                            setICOEngineDetail(engineInfo);
                        }
                    );
                }, 3000);
            } else {
                toast.error("Claim Failed!");
            }
        } catch (error) {
            toast.error("Claim Failed!");
        }
        toast.dismiss(load_toast_id);
    };
    // console.log(ICOEngineDetail)
    return (
        <div className="tokenStaking">
            <div className="scroll" id="token_staking"></div>
            <div className="tokenStakingContent">
                <div className="tokenStakingWrapper" data-aos="zoom-in">
                    <StakingCard
                        title={categoryTextPrivate}
                        ICOEnded={ICOEngineDetail?.ICOEnded || false}
                        paidAmount={ICOEngineDetail?.depositPrivate || 0}
                        claimedToken={ICOEngineDetail?.claimPrivate || 0}
                        totalPaidAmount={ICOEngineDetail?.totalDepositPrivate || 0}
                        tokenPrice={ICOEngineDetail?.pricePrivate || 0}
                        maxContribute={ICOEngineDetail?.maxContributePrivate || 0}
                        startTime={ICOEngineDetail?.startTimestampPrivate || 0}
                        endTime={ICOEngineDetail?.endTimestampPrivate || 0}
                        hardCap={ICOEngineDetail?.hardcapPrivate || 0}

                        setIsLoading={setIsCardLoading}
                        contributeMATIC={contributeMATIC}
                        claimSWCT={claimSWCT}
                        loginStatus={loginStatus}
                    />

                </div>

                <div className="icoBox" data-aos="zoom-in">
                    <h2>How to Take Part In The DPPE ICO</h2>
                    <ul>
                        <li>Visit our ICO section </li>
                        <li>Connect your wallet</li>
                        <li>Load MATIC to your wallet</li>
                        <li>On the Pre-Sale section, enter the amount of $SWCT you want to buy</li>
                        <li>Confirm your transaction and wait for the tokens to be airdropped to your wallet on the launch day</li>
                    </ul>

                    <h3>Swap your dreams with Swisscheese today!</h3>
                </div>
            </div>
        </div>
    )
}