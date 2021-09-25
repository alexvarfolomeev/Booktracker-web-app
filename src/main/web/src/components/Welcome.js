import React, { Component } from 'react'
import { Carousel, Caption} from 'react-bootstrap'

export class WelcomePage extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item style={{margin: 50}}>
                    <img
                        className="d-block w-100 text-black"
                        src="https://pbs.twimg.com/media/EnW5cTvXUAkacSY.jpg"
                        alt="First slide"
                        width="1200" height="800"/>
                    <Carousel.Caption>
                        <h3>Альберт Эйнштейн</h3>
                        <p>"Если вы хотите жить счастливой жизнью, привяжите ее к цели, а не к людям или вещам."</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{margin: 50}}>
                    <img
                        className="d-block w-100"
                        src="https://www.foicey.com/wp-content/uploads/2020/06/jjrr-min-1024x576.jpg"
                        alt="Second slide"
                        width="1200" height="800"/>

                    <Carousel.Caption>
                        <h3>Жан-Жак Руссо</h3>
                        <p>"Более полная жизнь не у того, кто прожил дольше, а у того, кто больше узнал."</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{margin: 50}}>
                    <img
                        className="d-block w-100"
                        src="https://i.sunhome.ru/journal/251/idealizm-v2.orig.jpg"
                        alt="Third slide"
                        width="1200" height="800"
                    />
                    <Carousel.Caption>
                        <h3>Платон</h3>
                        <p>"Книга - немой учитель."</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}

export default WelcomePage