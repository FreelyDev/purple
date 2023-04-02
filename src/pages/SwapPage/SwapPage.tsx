import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Footer from 'components/Section/footer/Footer';
import './style.scss'
import toast from 'react-hot-toast';
import TransactionModal from 'components/Modals/TransactionModal/TransactionModal';
import SwapCard from 'components/Section/SwapCard/SwapCard';
export default function SwapPage( ) {
    const [isLoading, setIsLoading] = useState(true);

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({query: "screen and (max-width: 640px) and (orientation:portrait)",});
    const isLandOrMobile = useMediaQuery({query: "screen and (max-height: 640px) and (orientation:landscape)",});
    useEffect(() => {

        if (!isLandOrMobile && !isTabletOrMobile) {
            setMenuOpen(false);
        }
       
    }, [ isTabletOrMobile, isLandOrMobile]);
    window.onload = ()=> {
        setIsLoading(false)
    };

    const [symbol1, setSymbol1] = useState('eth');
    const [swapValue1, setSwapValue1] = useState(0);
    
    const [symbol2, setSymbol2] = useState('eth');
    const [swapValue2, setSwapValue2] = useState(0);

    const [showTransaction, setShowTransaction] = useState(false)

    const [slippage, setSlippage] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [expertMode, setExpertMode] = useState(false)
    const [multiHops, setMultiHops] = useState(false)

    const onSwap =()=>{
        if(swapValue1 === 0 || swapValue2 === 0){
            toast.error('Please enter amount!')
        }
    }
        
    return (
        <>
            <Topbar menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <Loading isLoading={isLoading} />
            <div className="sections" >
                <div className="swap_content">
                    <div className="title"><p>Swap</p></div>
                    <SwapCard
                        symbol1 = {symbol1}
                        setSymbol1 = {setSymbol1}

                        symbol2 = {symbol2}
                        setSymbol2 = {setSymbol2}

                        swapValue1 = {swapValue1}
                        setSwapValue1 = {setSwapValue1}

                        swapValue2 = {swapValue2}
                        setSwapValue2 = {setSwapValue2}

                        setShowTransaction = {setShowTransaction}
                        onSwap = {onSwap}
                        setIsLoading = {setIsLoading}
                    />
                </div>
                <Footer/>
                <div className="effect1"></div>
                <div className="effect2"></div>
            </div>
            <TransactionModal 
                showModal={showTransaction} 
                setShowModal = {setShowTransaction}
                slippage = {slippage}
                setSlippage = {setSlippage}
                minutes = {minutes}
                setMinutes = {setMinutes}
                expertMode = {expertMode}
                setExpertMode = {setExpertMode}
                multiHops = {multiHops}
                setMultiHops = {setMultiHops}
            />
        </>
    )
}
