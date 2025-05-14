# Smart FAQ Bot

A modern, responsive chatbot interface built with Next.js and Tailwind CSS. This application provides an elegant UI for answering questions based on internal documentation.

## Features

- 🎨 Clean, modern interface with subtle animations
- 🌓 Light and dark mode support
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Real-time chat experience with typing indicators
- 📚 Source reference display with expandable sections
- 🔄 Automatic scroll handling
- ⌨️ Keyboard navigation support

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://your-repository-url/smart-faq-bot.git
cd smart-faq-bot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Development

The project uses:
- Next.js 13 with App Router
- Tailwind CSS for styling
- shadcn/ui components
- TypeScript for type safety

### Project Structure

```
├── app/                 # Next.js app directory
├── components/         
│   ├── chat/           # Chat-related components
│   ├── layout/         # Layout components
│   ├── theme/          # Theme provider
│   └── ui/             # UI components
├── lib/                # Utilities and data
└── public/             # Static assets
```

### Customization

- Colors: Edit `app/globals.css` to modify the color scheme
- FAQ Data: Update `lib/faq-data.ts` to add or modify responses
- UI Components: Modify components in the `components/` directory

## Building for Production

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.