import './farmCard.scss'
import { useEffect, useState } from 'react';

interface Props {
    apr: number,
    dppeEarned : number,
    onHarvest?:any
    setIsLoading ?:any
    setShowConnectModal?:any
}

export default function FarmCard(
    {
        apr,
        dppeEarned,
        onHarvest,
        setIsLoading,
        setShowConnectModal
    }:Props
) {

    
    const [imgCount, setImgCount] = useState(0)
    const onLoad = () => {
        setImgCount(imgCount + 1)
    }
    useEffect(() => {
        if (imgCount >= 3) {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }, [setIsLoading, imgCount]);

    const handleClick = ()=>{
        onHarvest();
    }


    return (
        <>
        <div className="farmCard">
            <div className="top">
                <div className="symbols">
                    <img src="/assets/logo.png" alt="" className='dppeImg' onLoad = {onLoad}/>
                    <img src="/assets/icons/icon_usdt.svg" alt=""  className='coinImg' onLoad = {onLoad}/>
                </div>
                <div className="symbol_name">
                    <h2>USDC-DPPE</h2>
                    <h4><img src="/assets/icons/icon_verified.svg" alt=""  onLoad = {onLoad}/> VERIFIED 0X</h4>
                </div>
            </div>
            <div className="row">
                <h3>APR : </h3>
                <h3>{(apr || 0).toFixed(2)}%</h3>
            </div>
            <div className="row mb-20">
                <h3>EARN : </h3>
                <h3>DPPE + FEES</h3>
            </div>
            <div className="row">
                <div className="col">
                    <h4><span>DPPE</span> EARNED</h4>
                    <h2>{(dppeEarned || 0).toFixed(5)}</h2>
                </div>
                <button className="harvestBtn" onClick={handleClick}>HARVEST</button>
            </div>
            <div className="row">
                <h5><span>USDC-DPPE LP</span> Staked</h5>
            </div>
            <div className="row">
                <button className='connectBtn' onClick={()=>setShowConnectModal(true)}>Connect Wallet</button>
            </div>
        </div>
        
        </>
    )
}
 