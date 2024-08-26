Flow Docs is a real-time collaborative text editor, similar to Google Docs, allowing multiple users to edit documents simultaneously. This project leverages cutting-edge technologies to deliver a smooth and efficient live editing experience, complete with user authentication, real-time notifications, and comments.
## Features

	•	Real-time Collaboration: Multiple users can edit documents simultaneously with updates reflecting instantly.
	•	User Authentication: Secure authentication using Clerk for managing users.
	•	Live Notifications and Comments: Users can leave comments and receive notifications in real-time, powered by Liveblocks.
	•	User Mentioning: Mention users in comments or text to get their attention.
	•	Responsive UI: Built with Tailwind CSS and ShadCN components for a modern, responsive design.
	•	Error Monitoring: Sentry is integrated to track and monitor errors for a seamless user experience.

## Tech Stack

	•	Frontend: TypeScript, Next.js, Tailwind CSS
	•	Real-time Collaboration: Liveblocks
	•	Authentication: Clerk
	•	UI Components: ShadCN
	•	Monitoring: Sentry

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
