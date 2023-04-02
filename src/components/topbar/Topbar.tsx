import { useWeb3React } from '@web3-react/core';
// import CustomDropdown from 'components/dropdown/CustomDropdown';
import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'
import { truncateWalletString } from 'utils';
import { getICOEngineInfo } from 'utils/contracts';
import ConnectModal from 'components/Modals/connectModal/ConnectModal';
import AccountModal from "components/Modals/accountModal/AccountModal";
import { ICOEngineDetail } from "utils/typs";
import './topbar.scss'
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import SocialSelector from './MySelector';

type MenuType = {
    menuOpen?: boolean;
    setMenuOpen(flag: boolean): void;
};
export default function Topbar({ menuOpen, setMenuOpen }: MenuType) {
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const { connector, library, chainId, account, active } = useWeb3React();
    const [ICOEngineDetail, setICOEngineDetail] = useState<ICOEngineDetail>(null);
    const [/*coinType*/, setCoinType] = useState("");

    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
        if (isLoggedin) {
            getICOEngineInfo(account).then(
                (engineInfo: ICOEngineDetail) => {
                    setICOEngineDetail(engineInfo);
                }
            );
        }
    }, [connector, library, account, active, chainId]);
    
    const [navId, setNavId] = useState("");
    const search = useLocation();
    useEffect(() => {
      
      if(search.hash.includes("#")){
        const hash = search.hash.replace("#", "");
        setNavId(hash);
      }else{
        const hash = search.pathname.replace("/", "");
        setNavId(hash);
      }
      
    }, [setNavId, search]);

    

    return (
        <div className="topbar">
            <div className="logo">
                <HashLink to="/" ><img src="assets/logo.png" alt="" /></HashLink>
                <div className="connectBtn button" onClick={() => { !loginStatus ? setShowConnectModal(true) : setShowAccountModal(true);}}>
                    <p>{loginStatus ? truncateWalletString(account) : "Connect Wallet"}</p>
                </div>
            </div>
            <div className="navList">
                <ul>
                    <li className={clsx(navId === "" ? "active_tab" : "")}><HashLink to="/" smooth>SWAP</HashLink></li>
                    <li className={clsx(navId === "farm" ? "active_tab" : "")}><HashLink to="/farm" smooth>FARM</HashLink></li>
                    <li className={clsx(navId === "launchpad" ? "active_tab" : "")}><HashLink to="/launchpad" smooth>launchpad</HashLink></li>
                    <li className={clsx(navId === "ico" ? "active_tab" : "")}><HashLink to="/ico" smooth>ICO</HashLink></li>
                    <li className={clsx(navId === "more" ? "active_tab" : "")}><HashLink to="/" smooth>MORE</HashLink></li>
                </ul>
            </div>
            <div className="btns">
                <div className="balance">
                    <img src="assets/logo.png" alt="" />
                    <p>$ {ICOEngineDetail?.MATICBalance?.toFixed(2) || "0.0"}</p>
                </div>
                <SocialSelector setVlaue={setCoinType}/>
                <div className="connectBtn button" onClick={() => { !loginStatus ? setShowConnectModal(true) : setShowAccountModal(true);}}>
                    <p>{loginStatus ? truncateWalletString(account) : "Connect Wallet"}</p>
                </div>
            </div>

            <div className={(menuOpen ? "hamburger active" : "hamburger")} onClick={() => setMenuOpen(!menuOpen)}>
                <span className="line1"></span>
                <span className="line2"></span>
                <span className="line3"></span>
            </div>
            
            <ConnectModal showConnectModal={showConnectModal} setShowConnectModal={setShowConnectModal} />
            <AccountModal showAccountModal={showAccountModal} setShowAccountModal={setShowAccountModal} />
        </div>
    )
}
