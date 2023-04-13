import { env } from "../../env.mjs"

interface MapProps {
    location_url: string
}

const extractLongLat = (url: string) => {
    // Extract latitude and longitude values from URL
    const latLngRegex = /@([-0-9.]+),([-0-9.]+),/i;
    let matches = url.match(latLngRegex);

    let lat: string | undefined;
    let lng: string | undefined;

    if (matches && matches.length >= 2) {
        lat = matches[1];
        lng = matches[2];
    }

    if (!lat || !lng) {
        matches = url.match(/query=(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (matches) {
            lat = matches[1];
            lng = matches[2];
        };
    }

    if (!lat || !lng) return null;

    return { lat, lng };
}

const Map = (props: MapProps) => {

    const url = props.location_url;

    if (!props.location_url)
        return <></>

    const latLong = extractLongLat(props.location_url);

    if (!latLong) return <></>;

    const mapLink: string = `https://www.google.com/maps/embed/v1/place?key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${latLong.lat},${latLong.lng}`;

    return (
        <iframe className="mt-6" 
            width="800" 
            height="400" 
            src={mapLink}
        />
    );
}

export default Map;