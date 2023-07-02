import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
  useLoadScript
} from '@react-google-maps/api';
import { useMemo, useState } from 'react';
const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function GoogleMapComponent({ location }) {
  const [latitude, setLatitude] = useState(31.516818102253165);
  const [longitude, setLongitude] = useState(74.3585145221313);
  const [formattedAddress, setFormattedAddress] = useState();
  const [autocomplete, setAutocomplete] = useState();
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: 'AIzaSyBdhJi9U3ZnoB3auMMNBMFwK0JO1PwP0II',

  // });
  const center = useMemo(() => ({ lat: 31.516818102253165, lng: 74.3585145221313 }), []);
  let geocoder = null;

  const onLoad = () => {
    geocoder = new window.google.maps.Geocoder();
  };

  const handleClick = e => {
    setLatitude(e?.latLng.lat());
    setLongitude(e?.latLng.lng());

    const latLng = {
      lat: e?.latLng.lat(),
      lng: e?.latLng.lng()
    };

    geocoder.geocode({ location: latLng }).then(res => {
      setFormattedAddress(res?.results[0].formatted_address);
      location(res.results[0].formatted_address);
    });
  };

  return (
    <div className='map'>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          onClick={e => {
            handleClick(e);
          }}
          onLoad={onLoad()}
          mapContainerClassName='map-container'
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <>
            <Marker position={{ lat: latitude, lng: longitude }}></Marker>
          </>
        </GoogleMap>
      )}
    </div>
  );
}

export default GoogleMapComponent;
