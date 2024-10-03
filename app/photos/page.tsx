import DownloadButton from "./DownloadButton";

export default function PhotosPage() {
  const images = [
    "https://i.ibb.co/qJQkbHj/823-FF774-80-CD-4268-BB4-D-B4113718-F0-A5-4-5005-c.jpg",
    "https://i.ibb.co/wSYkVG5/64458356-90-CE-48-DF-9-A7-E-85747919-A19-B-1-105-c.jpg",
    "https://i.ibb.co/QmL0TDr/9915-D8-DE-4-D1-A-4374-9-E76-CDD1-DFC75819-4-5005-c.jpg",
    "https://i.ibb.co/m4bfJ6Q/BCF31-B98-F9-AB-42-DF-80-C3-95-AFB095-B51-D-1-105-c.jpg",
    "https://i.ibb.co/0s9JLx3/4-B467923-2-ED6-4237-93-D9-73-AE573915-CD-1-105-c.jpg",
    "https://i.ibb.co/Xb1H4d4/FB3-FD92-C-5-A93-4968-81-FA-F4319-CC9-C47-A-1-105-c.jpg",
    "https://i.ibb.co/fXw5P74/A9510-A98-A482-498-A-83-D9-40-B1-C4-C132-DE-1-105-c.jpg",
    "https://i.ibb.co/0mkCZFG/6-AA6-D1-A2-1-D17-4928-A745-C134665-D1-AF1-1-105-c.jpg",
    "https://i.ibb.co/Q6DQHMS/31-BC2-E43-1-F31-4-A52-8-C4-C-B334-B3-CAC88-C-4-5005-c.jpg",
    "https://i.ibb.co/gJqQMM5/49437-C3-D-0-E46-4-D5-F-9-D89-8-B455-F4-CA381-1-105-c.jpg",
    "https://i.ibb.co/LdzFLfw/C7336766-9082-4-CCF-8317-656-DE85843-AB-1-105-c.jpg",
    "https://i.ibb.co/x8LVtLG/65-E188-AE-8-D91-4-BC0-8-B83-B55490-B8-B104-4-5005-c.jpg",
    "https://i.ibb.co/vdcpDwS/E2-FA7-DA8-3568-46-A7-A10-B-67105-B291-C74-4-5005-c.jpg",
    "https://i.ibb.co/Sr9W6vD/16821-F80-E89-C-48-A2-A277-B6-ED7297-E0-AD-4-5005-c.jpg",
    "https://i.ibb.co/tDpdvzp/3614-C3-A2-9912-4-D11-B6-E2-4509-E821-E59-C-1-105-c.jpg",
  ];

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', width: '90vw', margin: '0 auto' }}>
      {images.map((image, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-full h-48 mb-2 overflow-hidden">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <DownloadButton image={image} />
        </div>
      ))}
    </div>
  );
}
