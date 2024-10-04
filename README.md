# Full-Stack Stripe API Implementation

This project is a full-stack web application built using **Next.js**, **React**, **TypeScript**, and integrates **Stripe APIs** for both subscription and usage-based billing. The application also leverages **Supabase** for user authentication and as a database solution. All user data is securely managed through Supabase, and all the photos displayed on the app were captured and edited by Michael Setji.

## Features

- **User Authentication**: User registration and login are handled securely through Supabase.
- **Subscription & Usage-Based Billing**: Stripe APIs are used to manage subscriptions, while usage-based billing is monitored in real-time via webhooks to calculate charges at the end of each billing cycle.
- **Real-Time Webhook Communication**: Webhooks ensure accurate billing and usage tracking by synchronizing data between Stripe and the application.
- **Responsive UI Design**: Built with Tailwind CSS for a modern, responsive interface, displaying original photography by Michael Setji.

## Technologies Used

- **Next.js**: Framework for server-side rendering and frontend/backend integration.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed programming language for enhancing scalability.
- **Supabase**: Authentication and database solution.
- **Stripe APIs**: For managing subscriptions and usage-based billing.
- **Tailwind CSS**: For creating responsive and visually appealing UI.

## How to Use

1. **Visit the Application**: [Stripe Integration Web App](https://stripe-integration-gray.vercel.app/)

2. **Sign Up**:  
   - Create a new account using the **Sign Up** page. Your account is securely authenticated via Supabase.

3. **Subscribe**:  
   - Once logged in, you can select from available subscription options.  
   - Stripe handles the subscription, and real-time usage data is tracked through the integrated webhooks.

4. **Monitor Usage**:  
   - Usage is tracked in real-time and billing is calculated at the end of the month based on your usage data. This is all handled automatically via Stripe’s billing system and webhooks.

5. **Enjoy the UI**:  
   - The application features a responsive and modern design, showcasing original photography captured and edited by Michael Setji.

## Getting Started Locally

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/msetji/stripe-integration.git
