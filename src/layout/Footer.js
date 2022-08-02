import './layout.css';

const Footer = () => {
    
    return (
        <div className="footer">
            <div className="footer-left">
                <h2>Backbro AB</h2>
                <h3><a href="mailto:info@backbro.se">info@backbro.se</a></h3>
            </div>
            <div className="footer-right">
                <h3>Kent Bäcklund</h3>
                <p>073 - 383 29 70</p>
                <h3>Stefan Bäcklund</h3>
                <p>070 - 30 00 484</p>
                <h3>Håkan Bäcklund</h3>
                <p>070 - 641 85 65</p>
            </div>
        </div>
    )
}

export default Footer;