import useAuth from 'hooks/useAuth';
import './connectModal.scss'
import Bounce  from 'react-reveal/Bounce';
import { useEffect, useState } from 'react';
interface Props {
    showConnectModal: boolean,
    setShowConnectModal?: any

}
const ConnectModal: React.FC<Props> = ({
    showConnectModal,
    setShowConnectModal
}) => {

    const { login } = useAuth();
    const connectMetamask = () => {
        login(1);
        setShowConnectModal(false);
    }
    const connectWalletConnector = () => {
        login(2);
        setShowConnectModal(false);
    }

    const [isStart, setIsStart] = useState(false)
    useEffect(() => {
        if(showConnectModal)
        {
            
            setTimeout(() => {
                setIsStart(true)
            }, 100)
        }
    }, [setIsStart,  showConnectModal]);
    const onClose = ()=>{
        setIsStart(false)
        setTimeout(() => {
            setShowConnectModal(false);
        }, 800)
    }
    const cloaseHandle = (e:any)=>{
        if(e.target.className.includes("connectModal"))
        {
            onClose()
        }
    }
    return (
        <div className={showConnectModal === true ? "connectModal active" : "connectModal"} onMouseDown={(e) => {cloaseHandle(e)}}>
            <Bounce opposite when={isStart}>
            <div className="model_content">
                <div className="modal_top">
                    <h1 className="modal_title">Connect Wallet</h1>
                    <button className="closeBtn" onClick={onClose}><i className="fas fa-times"></i></button>
                </div>
                <div className="mdal_wrapper">
                    <div className="connectModalBtn metaMask" onClick={connectMetamask}>
                        <h2>Metamask</h2>
                        <div className="icon">
                            <img src="assets/metamask.png" alt="" />
                        </div>
                    </div>
                    <div className="connectModalBtn wallet" onClick={connectWalletConnector}>
                        <h2>Wallet Connect</h2>
                        <div className="icon"><img src="assets/wallet-connect.png" alt="" /></div>
                    </div>

                    <div className="connectModalBtn wallet" onClick={()=>{}}>
                        <h2>Wallet Connect</h2>
                        <div className="icon"><img src="assets/trust.png" alt="" /></div>
                    </div>

                    <div className="connectModalBtn wallet" onClick={()=>{}}>
                        <h2>Wallet Connect</h2>
                        <div className="icon"><img src="assets/BitKeep.png" alt="" /></div>
                    </div>
                    
                </div>
            </div>
            </Bounce>

        </div>
    )
}
export default ConnectModal;