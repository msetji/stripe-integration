Full-Stack Stripe API Implementation
This project is a full-stack application built using Node.js, Next.js, React, and TypeScript. It integrates Stripe APIs for both subscription and usage-based billing, and leverages Supabase for authentication and as a database solution. Users must create an account before subscribing, with all user data securely handled via Supabase authentication. All photos on the app are taken and edited by Michael Setji.

Features:
User Authentication: Implemented using Supabase to manage user registration and login.
Subscription & Usage-Based Billing: Stripe APIs handle the subscription system, while usage is monitored in real time using webhooks to calculate billing at the end of the month.
Real-Time Webhook Communication: Webhooks send data between the application and Stripe to ensure accurate billing and usage tracking.
Tailwind CSS for Styling: Used Tailwind CSS to create a responsive and modern UI.
Technologies Used:
Node.js
Next.js
React
TypeScript
Supabase (Authentication & Database)
Stripe APIs
Tailwind CSS
