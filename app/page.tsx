import React from "react";

export default function Home() {
  return (
    <main className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">Full-Stack Stripe API Implementation</h1>
      <p className="mb-4">
        This project is a full-stack application built using Node.js, Next.js, React, and TypeScript. It integrates Stripe APIs for both subscription and usage-based billing, and leverages Supabase for authentication and as a database solution. Users must create an account before subscribing, with all user data securely handled via Supabase authentication.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Features:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>User Authentication:</strong> Implemented using Supabase to manage user registration and login.
        </li>
        <li>
          <strong>Subscription & Usage-Based Billing:</strong> Stripe APIs handle the subscription system, while usage is monitored in real time using webhooks to calculate billing at the end of the month.
        </li>
        <li>
          <strong>Real-Time Webhook Communication:</strong> Webhooks send data between the application and Stripe to ensure accurate billing and usage tracking.
        </li>
        <li>
          <strong>Tailwind CSS for Styling:</strong> Used Tailwind CSS to create a responsive and modern UI.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Technologies Used:</h2>
      <ul className="list-disc list-inside">
        <li>Node.js</li>
        <li>Next.js</li>
        <li>React</li>
        <li>TypeScript</li>
        <li>Supabase (Authentication & Database)</li>
        <li>Stripe APIs</li>
        <li>Tailwind CSS</li>
      </ul>
    </main>
  );
}
