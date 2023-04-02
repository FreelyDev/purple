import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Footer from 'components/Section/footer/Footer';
import './style.scss'
import MySelect from 'components/Widgets/MySelect';
import FarmCard from 'components/Section/FarmCard/FarmCard';
import CheckBox from 'components/Widgets/CheckBox';
import ConnectModal from 'components/Modals/connectModal/ConnectModal';
export default function FarmPage( ) {
    const [isLoading, setIsLoading] = useState(true);

    const [isCard1Loading, setIsCard1Loading] = useState(true)
    const [isCard2Loading, setIsCard2Loading] = useState(true)
    const [isCard3Loading, setIsCard3Loading] = useState(true)

    // const [isDocLoading, setIsDocLoading] = useState(true);

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({query: "screen and (max-width: 640px) and (orientation:portrait)",});
    const isLandOrMobile = useMediaQuery({query: "screen and (max-height: 640px) and (orientation:landscape)",});
    useEffect(() => {
        if (isCard1Loading || isCard1Loading || isCard1Loading ) {
            setIsLoading(true)
        }
        else{
            setIsLoading(false)
        }
        if (!isLandOrMobile && !isTabletOrMobile) {
            setMenuOpen(false);
        }
       
    }, [isCard1Loading, isCard2Loading, isCard3Loading, isTabletOrMobile, isLandOrMobile]);
    window.onload = ()=> {
        setIsCard1Loading(false)
        setIsCard2Loading(false)
        setIsCard3Loading(false)
    };
    const [showConnectModal, setShowConnectModal] = useState(false);
    const option = [
        {value : 'hot', label : 'HOT'},
        {value : 'normal', label : 'NORMAL'},
    ]
    const [sortValue, setSortValue] = useState(option[0].value)
    const [/*isStaked*/, setIsStaked] = useState(false)
    const [isLive, setIsLive] = useState(true)
    const [searchVal, setSearchVal] = useState('')
    
        
    return (
        <>
            <Topbar menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <Loading isLoading={isLoading} />
            <div className="sections" >
                <div className="farm_content">
                    <div className="title"><p>Farms</p></div>
                    <h1>Farms</h1>
                    <h2>Stake LP tokens to earn.</h2>
                    <div className="filter">
                        <div className="farmType">
                            <h5>Farm Type</h5>
                            <CheckBox label='Staked only' onChange={setIsStaked}/>
                        </div>
                        <div className="switch">
                            <div className="label">FILTER BY</div>
                            <div className="swichBtns">
                                <div className={`tab ${isLive ? 'active_tab':''}`} onClick = {()=>setIsLive(true)}>Live</div>
                                <div className={`tab ${!isLive ? 'active_tab':''}`} onClick = {()=>setIsLive(false)}>Finished</div>
                            </div>
                        </div>
                        <div className="sort">
                            <div className="label">SORT BY</div>
                            <MySelect value = {sortValue} options={option} onChange = {setSortValue} className = 'sortSelect'/>
                        </div>
                        <div className="search">
                            <div className="label">SEARCH</div>
                            <input type="text" placeholder='Search Farms' value={searchVal} onChange = {(e)=>setSearchVal(e.target.value)}/>
                        </div>
                    </div>
                    <div className="farm_list">
                    <FarmCard apr={0} onHarvest={() => { } } dppeEarned={0} setIsLoading = {setIsCard1Loading} setShowConnectModal = {setShowConnectModal}/>
                    <FarmCard apr={0} onHarvest={()=>{}} dppeEarned={0} setIsLoading = {setIsCard2Loading} setShowConnectModal = {setShowConnectModal}/>
                    <FarmCard apr={0} onHarvest={()=>{}} dppeEarned={0} setIsLoading = {setIsCard3Loading} setShowConnectModal = {setShowConnectModal}/>
                    </div>
                    
                    
                </div>
                <Footer/>
                <div className="effect1"></div>
                <div className="effect2"></div>
            </div>
            <ConnectModal showConnectModal={showConnectModal} setShowConnectModal={setShowConnectModal} />
            
        </>
    )
}
