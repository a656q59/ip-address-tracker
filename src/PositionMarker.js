import React, { useEffect, useMemo} from 'react';
import { Marker,Popup,useMap } from 'react-leaflet';
import icon from './icon';

function PositionMarker({address}) {
    const position = useMemo(()=>{
        return [address.location.lat, address.location.lng]
    }, [address.location.lat, address.location.lng])
    const map = useMap();
    useEffect(()=>{
        map.flyTo(position,13,{
            animate:true,
        })
    },[map,position])


    return (
            <>
            <Marker
            icon={icon}
            position={position}>
                 <Popup>   A pretty CSS3 POPUP</Popup>
            </Marker>
            </>
    );

    // const [position, setPosition] = useState(null)
    // const map = useMapEvents({
    //   click() {
    //     map.locate()
    //   },
    //   locationfound(e) {
    //     console.table(e);
    //     setPosition(e.latlng)
    //     map.flyTo(e.latlng, map.getZoom())
    //   },
    // })
  
    // return position === null ? null : (
    //   <Marker position={position}>
    //     <Popup>You are here</Popup>
    //   </Marker>
    // )
     
  
}

export default PositionMarker;