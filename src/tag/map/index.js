import React from 'react';
import autobind    from 'autobind-decorator';
import Dimensions from 'react-dimensions';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import './styles.css';

@autobind
class MapTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
		const mapState = { center: [55.76, 37.64], zoom: 10 };
		const {containerWidth, containerHeight} = this.props;

//console.log("map props", this.props);

		return (
<div style={{outline:"1px solid #ccc"}}>
  <YMaps>
    <Map state={mapState} width={containerWidth} height={500}>
      <Placemark
        geometry={{
          coordinates: [55.751574, 37.573856]
        }}
        properties={{
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка'
        }}
        options={{
          iconLayout: 'default#image',
          iconImageHref: 'images/myIcon.gif',
          iconImageSize: [30, 42],
          iconImageOffset: [-3, -42]
        }}
      />
    </Map>
  </YMaps>
</div>

        );

    }
}


export default Dimensions()(MapTag);