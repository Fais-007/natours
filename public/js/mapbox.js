export const displayMap = (locations) => {
    mapboxgl.accessToken =
        'pk.eyJ1IjoiamFlZ2VyOSIsImEiOiJja2M4NnNyMWMwc2F1MnZueHN4MHprMHk3In0.k6Ldra_MT6_dl2uYb_zOzw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/jaeger9/ckc86x0eg2xhl1ip239d8ntqw',
        scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom',
        })
            .setLngLat(loc.coordinates)
            .addTo(map);

        bounds.extend(loc.coordinates);

        new mapboxgl.Popup({
            offset: 30,
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100,
        },
    });
};
