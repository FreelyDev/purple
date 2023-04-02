import './footer.scss'
export default function Footer() {
    return (
        <div className="footer">
            <div className="footerContent">
                <div className="wrapper">
                    <div className="socialLinks">
                        <a href="https://t.me/" target="_blank"rel="noreferrer">
                            <i className="fab fa-telegram"></i>
                        </a>
                        <a href="https://discord.com/" target="_blank"rel="noreferrer">
                            <i className="fab fa-discord"></i>
                        </a> 

                        <a href="https://twitter.com/" target="_blank"rel="noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a> 
                    </div>
                    <div className="bottom">
                        <div className="balance">
                            <img src="assets/logo.png" alt="" />
                            <p>$ {"0.0"}</p>
                        </div>
                        <a href="https://opensea.com/" target="_blank"rel="noreferrer">
                            Buy DPPE <i className="fas fa-arrow-right"></i>
                        </a> 
                    </div>
                </div>
            </div>
        </div>
    )
}
 