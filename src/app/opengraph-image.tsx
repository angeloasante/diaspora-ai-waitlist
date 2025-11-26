import { ImageResponse } from "next/og";

export const alt = "Diaspora AI — Intelligent Flight Booking";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              marginRight: "20px",
            }}
          >
            ✈️
          </div>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Diaspora AI
          </h1>
        </div>
        <p
          style={{
            fontSize: "32px",
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            marginTop: "0",
          }}
        >
          Intelligent Flight Booking Platform
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}