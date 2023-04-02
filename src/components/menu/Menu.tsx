import "./menu.scss"
import { HashLink } from 'react-router-hash-link'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
type MenuType = {
    menuOpen: boolean;
    setMenuOpen(flag: boolean): void;
};

export default function Menu({ menuOpen, setMenuOpen }: MenuType) {
    const [navId, setNavId] = useState('')
    const search = useLocation();
    useEffect(() => {
        const label = search.hash.replace('#', '')
        setNavId(label)
    }, [setNavId, search]);
    return (
        <div className={"sidebar " + (menuOpen && "active")}>
            <ul>
            {/* <li className={clsx(navId === "" ? "active_tab" : "")}><HashLink to="/" smooth>SWAP</HashLink></li>
                    <li className={clsx(navId === "farm" ? "active_tab" : "")}><HashLink to="/farm" smooth>FARM</HashLink></li>
                    <li className={clsx(navId === "launchpad" ? "active_tab" : "")}><HashLink to="/launchpad" smooth>launchpad</HashLink></li>
                    <li className={clsx(navId === "ico" ? "active_tab" : "")}><HashLink to="/ico" smooth>ICO</HashLink></li>
                    <li className={clsx(navId === "more" ? "active_tab" : "")}><HashLink to="/" smooth>MORE</HashLink></li> */}
                <li onClick={() => setMenuOpen(false)} className={`menuItem1 ${menuOpen ? "active":""} ${navId === ''? 'selected':''}`}>
                    <HashLink to="/" smooth>SWAP</HashLink>
                </li>
                <li onClick={() => setMenuOpen(false)} className={`menuItem2 ${menuOpen ? "active":""} ${navId === 'farm'? 'selected':''}`}>
                    <HashLink to="/farme" smooth>FARM</HashLink>
                </li>
                <li onClick={() => setMenuOpen(false)} className={`menuItem3 ${menuOpen ? "active":""} ${navId === 'launchpad'? 'selected':''}`}>
                    <HashLink to="/launchpad" smooth>launchpad</HashLink>
                </li>
                <li onClick={() => setMenuOpen(false)} className={`menuItem4 ${menuOpen ? "active":""} ${navId === 'ico'? 'selected':''}`}>
                    <HashLink to="/icoe" smooth>ICO</HashLink>
                </li>
                
                <li onClick={() => setMenuOpen(false)} className={`menuItem5 ${menuOpen ? "active":""} ${navId === 'more'? 'selected':''}`}>
                    <HashLink to="/" smooth>MORE</HashLink>
                </li>

            </ul>
        </div>
    )
}

