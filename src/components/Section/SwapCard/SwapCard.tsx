import './swapCard.scss'

import toast from 'react-hot-toast';
import MySelect from 'components/Widgets/MySelect';
import { useEffect, useState } from 'react';
import ConnectModal from 'components/Modals/connectModal/ConnectModal';

interface Props {
    symbol1: string,
    setSymbol1?: any

    symbol2: string,
    setSymbol2?: any

    swapValue1?:number
    setSwapValue1?:any

    swapValue2?:number
    setSwapValue2?:any

    setShowTransaction?:any
    onSwap?:any
    setIsLoading?(flag: boolean): void;
}

export default function SwapCard(
    {
        symbol1,
        setSymbol1,
    
        symbol2,
        setSymbol2,
    
        swapValue1,
        setSwapValue1,
    
        swapValue2,
        setSwapValue2,
    
        setShowTransaction,
        onSwap,
        setIsLoading
    }:Props
) {
    const [showConnectModal, setShowConnectModal] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    }, [setIsLoading]);
    const [focused1, setFocused1] = useState(false)
    const [focused2, setFocused2] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const onSwapValue1 =(e)=>{
        setIsProcessing(false)
        setSwapValue1(parseFloat( e.target.value))
    }
    const onSwapValue2 =(e)=>{
        setIsProcessing(false)
        setSwapValue2(parseFloat( e.target.value))
    }
    const onSwapHandle =()=>{
        setIsProcessing(true)
        if(swapValue1 === 0 || swapValue2 === 0){
            toast.error('Please enter amount!')
        }
        onSwap()
    }
    const option = [
        {value : 'eth', label : 'ETH'},
        {value : 'usdt', label : 'USDT'},
        {value : 'alien', label : 'ALIEN'},
        {value : 'dppe', label : 'DPPE'},
    ]

    return (
        <>
            <div className="swapCard">
                <h2>Swap</h2>
                <p>Trade tokens in an instant</p>
                <div className="btns">
                    <button onClick={()=>setShowTransaction(true)}><i className="fas fa-cog"></i></button>
                    <button><i className="fas fa-history"></i></button>
                    <button><i className="fas fa-undo"></i></button>
                </div>
                <div className="line"></div>
                
                <div className="select">
                    <MySelect value={symbol1} options={option} onChange = {setSymbol1}/>
                </div>
                <div className={`row input_div ${isProcessing && swapValue1 === 0 ? 'error':''}`}>
                    <input type="number" value={focused1 ? swapValue1 : swapValue1.toFixed(2)} onChange = {onSwapValue1} onFocus = {() => setFocused1(true)} onBlur = {() => {setFocused1(false); setSwapValue1(parseFloat(swapValue1.toFixed(2)))}}/>
                </div>
                <div className="arrow" onClick={onSwapHandle}><i className="fas fa-arrow-down"></i></div>

                <div className="select">
                    <MySelect value={symbol2} options={option} onChange = {setSymbol2}/>
                </div>
                <div className={`row input_div ${isProcessing && swapValue1 === 0 ? 'error':''}`}>
                <input type="number" value={focused2 ? swapValue2 : swapValue2.toFixed(2)} onChange = {onSwapValue2} onFocus = {() => setFocused2(true)} onBlur = {() => {setFocused2(false); setSwapValue2(parseFloat(swapValue2.toFixed(2)))}}/>
                </div>
                <div className="row">
                    <h5>Slippage Tolerance</h5>
                    <h4>0.5%</h4>
                </div>
                <div className="row">
                    <button className='connectBtn' onClick={()=>setShowConnectModal(true)}>Connect Wallet</button>
                </div>
            </div>
            <ConnectModal showConnectModal={showConnectModal} setShowConnectModal={setShowConnectModal} />
         </>
    )
}
 