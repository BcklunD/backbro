import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './components.css';
import { config } from '../Constants'; 
var Carousel = require('react-responsive-carousel').Carousel;

const statusFormatter = (currentItem, total) => {
    return `${currentItem} / ${total}`;
}

const ImageSlider = ({ lopnr, images }) => {
    return (
        <Carousel 
            infiniteLoop
            dynamicHeight
            showIndicators={false}
            emulateTouch
            showStatus={true}
            statusFormatter={statusFormatter}>
            {images.map((image, index) => {
                return (
                    <div>
                        <img src={`${config.url.DB_URL}/lagenhet/${lopnr}/${image}`} alt='Lägenhetsbild' key={`${image}-${index}`}/>
                    </div>
                )
            })}
        </Carousel>
    )
}

export default ImageSlider;