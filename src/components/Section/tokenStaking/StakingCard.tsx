import BtnTimer from 'components/timer/BtnTimer';
import { useEffect, useState } from 'react';
import './tokenStaking.scss'
import moment from 'moment';
type LoadingType = {
    title?: string
    ICOEnded?: boolean
    paidAmount?: number
    claimedToken?: number
    totalPaidAmount?: number
    tokenPrice?: number
    maxContribute?: number
    startTime?: number
    endTime?: number
    hardCap?: number
    loginStatus?: boolean
    setIsLoading?(flag: boolean): void
    contributeMATIC?(category: string, amount: number): void
    claimSWCT?(category: string): void
};
export default function StakingCard(
    {
        title,
        ICOEnded,
        paidAmount,
        claimedToken,
        totalPaidAmount,
        tokenPrice,
        maxContribute,
        startTime,
        endTime,
        hardCap,
        loginStatus,
        setIsLoading,
        contributeMATIC,
        claimSWCT,
    }: LoadingType) {

    const [isStartTimeEnd, setIsStartTimeEnd] = useState(false)
    const [isEndTimeEnd, setIsEndtTimeEnd] = useState(false)

    useEffect(() => {
        let myInterval = setInterval(() => {
            const currentDate: any = Date.now() / 1000;

            if (currentDate < startTime) {
                setIsStartTimeEnd(false)
            }
            else {
                setIsStartTimeEnd(true)
            }

            if (currentDate < endTime) {
                setIsEndtTimeEnd(false)
            }
            else {
                setIsEndtTimeEnd(true)
            }

        }, 0)
        return () => {
            clearInterval(myInterval);
        };
    }, [setIsStartTimeEnd, setIsEndtTimeEnd, startTime, endTime]);
    const [imgCount, setImgCount] = useState(0)
    const onLoad = () => {
        setImgCount(imgCount + 1)
    }
    useEffect(() => {
        if (imgCount >= 1) {
            setIsLoading(false)
        }
    }, [setIsLoading, imgCount]);

    const [stakeCount, setStakeCount] = useState<number>(0)
    const [isValid, setIsValid] = useState(0)
    const onChangeVal = (e: any) => {
        if (e.target.value === '0') {
            setIsValid(1)
        } else if (parseFloat(e.target.value) > maxContribute) {
            setIsValid(2)
        } else {
            setIsValid(0)
        }
        setStakeCount(parseFloat(e.target.value))
    }

    return (
        <div className="stakingWrapper">
            <div className="header">
                <img src="assets/logo.png" alt="" className='logoImg' onLoad={onLoad} />
                <h2>{title || '_'}</h2>
            </div>

            <div className="btns">
                <span>
                    <p className='lft'>Paid Amount :</p> <p>{paidAmount.toFixed(2)} USDT</p>
                </span>
                <span>
                    <p className='lft'>Claimed Token : </p> <p>{claimedToken.toFixed(2)} $DPPE</p>
                </span>
                
                <span>
                    <p className='lft'>Reserved Amount :</p> <p>{tokenPrice === 0 ? 0 : (paidAmount / tokenPrice).toFixed(2)} $DPPE</p>
                </span>
                <span> 
                    <button
                    className="stakeBtn button"
                    onClick={() => { claimSWCT(title) }}
                    disabled={!loginStatus || !ICOEnded || claimedToken>=(paidAmount / tokenPrice)}
                >
                    Claim
                </button></span>
            </div>


            <div className="contribute">
                <p>Your contribution (USDT)</p>
                <span>
                    <input
                        type="number"
                        onChange={(e: any) => { onChangeVal(e) }}
                        value={stakeCount}
                        min={0}
                        max={10}
                        required
                        style={{ boxShadow: isValid === 0 ? '0px 0px 5px #ff040400' : '0px 0px 5px #ff3f04' }}
                    />
                    {isValid === 2 && <p className='alrt'>Too Max</p>}
                    {(isValid === 1) && <p className='alrt'>Not Amount</p>}
                    <p>USDT</p>
                    <button
                        className="harvest button"
                        disabled={(!isStartTimeEnd || isEndTimeEnd)}
                        onClick={() => { contributeMATIC(title, stakeCount) }}
                    >
                        {!isStartTimeEnd ?
                            <BtnTimer deadLine={startTime} /> :
                            isEndTimeEnd ? 'Finished' : 'CONTRIBUTE'
                        }
                    </button>
                </span>
                <p>You'll be refunded any excess tokens when you claim</p>
            </div>

            <div className="state">
                
                <span>
                    <p className='lft'>Token Price</p>
                    <p>{tokenPrice} USDT/DPPE</p>
                </span>
                <span>
                    <p className='lft'>Max Contribute</p>
                    <p>{maxContribute || "UNLIMITED"} USDT</p>
                </span>
                <span>
                    <p className='lft'>Hard Cap</p>
                    <p>{hardCap} USDT</p>
                </span>

                <span>
                    <p className='lft'>Start Date</p>
                    <p>{`${moment(startTime * 1000).format("MMM DD, YYYY hh:mm a")}`} </p>

                </span>
                <span>
                    <p className='lft'>End Date</p>
                    <p>{`${moment(endTime * 1000).format("MMM DD, YYYY hh:mm a")}`} </p>

                </span>
            </div>
        </div>
    )
}