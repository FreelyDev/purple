import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Footer from 'components/Section/footer/Footer';
import './style.scss'
import LaunchTable from 'components/Section/launchTable/LaunchTable';

interface DataType {
    name: string
    img: string
    coin : string
    hardcap: number;
    wlStage : number;
    status : string;
    totalRaised: number;
    allocation: number;
}
const tempData:DataType[] = [
    {
        name : 'DPPE',
        img: '/assets/logo.png',
        coin : 'Raising ETH',
        hardcap: 0,
        wlStage : 0,
        status : 'Planned',
        totalRaised: 0,
        allocation: 0,
    },
]
export default function LaunchPage( ) {

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({query: "screen and (max-width: 640px) and (orientation:portrait)",});
    const isLandOrMobile = useMediaQuery({query: "screen and (max-height: 640px) and (orientation:landscape)",});
    useEffect(() => {
        
        if (!isLandOrMobile && !isTabletOrMobile) {
            setMenuOpen(false);
        }
       
    }, [isTabletOrMobile, isLandOrMobile]);


    const [searchVal, setSearchVal] = useState('')

    const [myData, setMydata] = useState<DataType[]>(tempData)

    const onChangeFilter = (e)=>{
        setSearchVal(e.target.value)
    }
    
    useEffect(() => {
        
        if (searchVal !==""){
            const filteredData = tempData.filter(item => {
                return item.name === searchVal.toString() ;
             });
    
            setMydata(filteredData)
        }else {
            setMydata(tempData)
        }
       
    }, [searchVal]);
    
    return (
        <>
            <Topbar menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <div className="sections" >
                <div className="launch_content">
                    <div className="title"><p>Latest</p></div>
                    <h1><span>Purple electric</span> launchpad</h1>
                    <h2>Buy new tokens launching on zksync Chain</h2>
                    <div className="launch_list">
                        <div className="search">
                            <input type="text" placeholder='Search Farms' value={searchVal} onChange = {onChangeFilter}/>
                        </div>
                        <LaunchTable data = {myData}/>
                    </div>
                </div>
                <Footer/>
                <div className="effect1"></div>
                <div className="effect2"></div>
            </div>
            
        </>
    )
}
