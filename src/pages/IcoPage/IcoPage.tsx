import Loading from 'components/loading/Loading';
import Menu from 'components/menu/Menu';
import Topbar from 'components/topbar/Topbar';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import TokenSale from 'components/Section/tokenStaking/TokenSale';
import Footer from 'components/Section/footer/Footer';
import './style.scss'
export default function IcoPage( ) {
    const [isLoading, setIsLoading] = useState(true);

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({query: "screen and (max-width: 640px) and (orientation:portrait)",});
    const isLandOrMobile = useMediaQuery({query: "screen and (max-height: 640px) and (orientation:landscape)",});
    useEffect(() => {


        if (isTabletOrMobile) {
        }
    
        if (isLandOrMobile) {
        }
        if (!isLandOrMobile && !isTabletOrMobile) {
            setMenuOpen(false);
        }
       
    }, [isLoading, isTabletOrMobile, isLandOrMobile]);
    AOS.init();
    window.onload = ()=> {
        setIsLoading(false)
        setTimeout(() => {
            AOS.init({
                // Global settings:
                disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
                startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
                initClassName: 'aos-init', // class applied after initialization
                animatedClassName: 'aos-animate', // class applied on animation
                useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
                disableMutationObserver: false, // disables automatic mutations' detections (advanced)
                debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
                throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
              
                // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
                offset: 120, // offset (in px) from the original trigger point
                delay: 0, // values from 0 to 3000, with step 50ms
                duration: 800, // values from 0 to 3000, with step 50ms
                easing: 'ease', // default easing for AOS animations
                once: false, // whether animation should happen only once - while scrolling down
                mirror: false, // whether elements should animate out while scrolling past them
                anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
              
              });
        }, 500);
    };
    
    return (
        <>
            <Topbar menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <Menu menuOpen = {menuOpen} setMenuOpen = {setMenuOpen}/>
            <Loading isLoading={isLoading} />
            <div className="sections">
                <div className="ico_content">
                    <div className="title"><p>Token Sale</p></div>
                    <TokenSale setIsLoading = {setIsLoading}/>
                </div>
                <Footer/>
                <div className="effect1"></div>
                <div className="effect2"></div>
            </div>
            
        </>
    )
}
