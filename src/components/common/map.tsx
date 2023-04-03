import { env } from "../../env.mjs"

interface MapProps {
    location_url: string
}

const Map = (props: MapProps) => {

    const url = props.location_url;

    if (!props.location_url)
        return <></>

    console.log(url)

    // Extract latitude and longitude values from URL
    const latLngRegex = /@([-0-9.]+),([-0-9.]+),/i;
    const matches = url.match(latLngRegex);

    if (!matches || matches.length < 2) return <></>;

    const lat = matches[1];
    const lng = matches[2];

    if (!lat || !lng) return <></>;

    const mapLink: string = `https://www.google.com/maps/embed/v1/place?key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}`;

    return (
        <iframe className="mt-6" 
            width="800" 
            height="400" 
            src={mapLink}
        />
    );
}

export default Map;