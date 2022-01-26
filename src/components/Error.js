
function Error() {
    return (
        <div className="error">
            <div className="sa">
                <div className="sa-error">
                    <div className="sa-error-x">
                        <div className="sa-error-left"></div>
                        <div className="sa-error-right"></div>
                    </div>
                    <div className="sa-error-placeholder"></div>
                    <div className="sa-error-fix"></div>
                </div>
            </div>
            <div className="sa-error-message">
                <h2>Något gick fel!</h2>
                <p>Försök igen, eller kontakta oss på info@backbro.se för att få hjälp.</p>
            </div>
        </div>
    );
}

export default Error;