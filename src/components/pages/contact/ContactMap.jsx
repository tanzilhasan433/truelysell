import React from "react";

const ContactMap = () => {
  const mapSrc =
    "https://www.google.com/maps/embed/v1/place?q=California&key=YOUR_GOOGLE_MAPS_API_KEY";
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Our Location</h2>
      <div className="relative w-full h-96">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactMap;
