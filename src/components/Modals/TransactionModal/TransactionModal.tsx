import './transactionModal.scss'
import Bounce  from 'react-reveal/Bounce';
import { useEffect, useState } from 'react';
import MySwicth from 'components/Widgets/MySwicth';
interface Props {
    showModal: boolean,
    setShowModal?: any

    slippage?:number
    setSlippage?:any

    minutes?:number
    setMinutes?:any

    expertMode?:boolean
    setExpertMode?:any

    multiHops?:boolean
    setMultiHops?:any
}
const TransactionModal: React.FC<Props> = ({
    showModal,
    setShowModal,
    
    slippage,
    setSlippage,
    minutes,
    setMinutes,

    expertMode,
    setExpertMode,

    multiHops,
    setMultiHops,
}) => {

    const [isStart, setIsStart] = useState(false)
    useEffect(() => {
        if(showModal)
        {
            setTimeout(() => {
                setIsStart(true)
            }, 100)
        }
        
    }, [setIsStart,  showModal]);
    const onClose = ()=>{
        setIsStart(false)
        setTimeout(() => {
            setShowModal(false);
        }, 800)
    }
    const cloaseHandle = (e:any)=>{
        if(e.target.className.includes("connectModal"))
        {
            onClose()
        }
    }

    const [focused, setFocused] = useState(false)
    const onChangeSlippage =(e)=>{
        setSlippage(parseFloat(e.target.value))
    }
    const onChangeMinutes =(e)=>{
        setMinutes(parseFloat(e.target.value))
    }
    return (
        <div className={showModal === true ? "transactionModal active" : "transactionModal"} onMouseDown={(e) => {cloaseHandle(e)}}>
            <Bounce opposite when={isStart}>
            <div className="model_content">
                <div className="modal_top">
                    <h1 className="modal_title">Transaction Settings</h1>
                    <button className="closeBtn" onClick={onClose}><i className="fas fa-times"></i></button>
                </div>
                <div className="modal_wrapper">
                    <p>Slippage tolrance</p>
                    <div className="row mb-20">
                        <div className='input_div w-100'>
                            <input type="number" className='my_input' value={focused ? slippage : slippage.toFixed(2)} onChange = {onChangeSlippage} onFocus = {() => setFocused(true)} onBlur = {() => {setFocused(false); setSlippage(parseFloat(slippage.toFixed(2)))}}/>
                            <div className="label">%</div>
                        </div>
                        <h4>Auto</h4>
                    </div>
                    <p>Transaction Deadline</p>
                    <div className="row mb-20">
                        <div className='input_div'>
                            <input type="number" className='my_input w-130' value={minutes} onChange = {onChangeMinutes}/>
                        </div>
                        <h4>minutes</h4>
                    </div>
                    <p>Interface Settings</p>
                    <div className="row w-100">
                        <h4>Toggle Expert Mode</h4>
                        <MySwicth setChecked={setExpertMode}/>
                    </div>
                    <div className="row w-100">
                        <h4>TDisable Multihops</h4>
                        <MySwicth setChecked={setMultiHops}/>
                    </div>
                </div>
            </div>
            </Bounce>
        </div>
    )
}
export default TransactionModal;