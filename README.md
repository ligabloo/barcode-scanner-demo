# Barcode Scanner Demo

A modern web application for scanning and parsing PDF417 barcodes from driver's licenses and ID cards. Built with React, TypeScript, and the Barcode Detection API.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-cyan)

## 🚀 Features

- **Real-time Barcode Scanning**: Utilizes the device camera to scan PDF417 barcodes in real-time
- **AAMVA Standard Parsing**: Automatically parses driver's license data according to AAMVA standards
- **Modern UI/UX**: Clean, responsive interface with smooth page transitions using View Transition API
- **Lightweight Routing**: Client-side routing with Wouter for fast navigation
- **Mobile-First Design**: Optimized for mobile devices with camera access
- **Type-Safe**: Built with TypeScript for robust development experience

## 📋 Prerequisites

- Node.js (v16 or higher recommended)
- A modern browser with support for:
  - MediaDevices API (camera access)
  - Barcode Detection API (or polyfill)
  - View Transition API (optional, graceful degradation)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd barcode-scanner-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 📦 Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the production-ready application
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
barcode-scanner-demo/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components
│   │   ├── Home.tsx            # Landing page
│   │   ├── Scanner.tsx         # Barcode scanner page
│   │   ├── LicenseDetails.tsx  # Display parsed license data
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Public static files
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🎯 How It Works

1. **Home Page**: Welcome screen with a button to start scanning
2. **Scanner Page**: 
   - Requests camera permission
   - Displays live camera feed
   - Continuously scans for PDF417 barcodes
   - Automatically parses detected barcodes using AAMVA parser
   - Redirects to license details page upon successful scan
3. **License Details Page**: 
   - Displays parsed information including:
     - Personal information (name, DOB, gender, physical characteristics)
     - License information (license number, issue/expiration dates)
     - Address details
     - Vehicle class (if available)
   - Options to scan another license or return home

## 🔧 Technologies Used

### Core
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite (Rolldown)** - Fast build tool and dev server

### Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing

### Barcode Processing
- **@zxing/browser 0.1.5** - Web library for barcode detection


### Routing & Navigation
- **Wouter 3.9.0** - Lightweight routing library
- **View Transition API** - Smooth page transitions (where supported)

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite React Plugin** - Fast Refresh for React development

## 🌐 Browser Compatibility

This application works best on modern browsers with camera support. For the Barcode Detection API:

- **Chrome/Edge 83+**: Native support
- **Safari/Firefox**: Requires polyfill (included via `barcode-detector` package)

## 🔒 Privacy & Security

- Camera access is only requested when the scanner page is opened
- All barcode processing happens locally in the browser
- License data is stored temporarily in `sessionStorage` only
- No data is sent to external servers

## 📱 Mobile Usage

This application is optimized for mobile devices:
- Automatically uses the rear camera on mobile devices
- Touch-friendly interface
- Responsive design adapts to different screen sizes

## ⚠️ Important Notes

- **Camera Permissions**: The application requires camera access to function. Users must grant permission when prompted.
- **HTTPS Required**: Camera access requires a secure context (HTTPS) in production environments.
- **Lighting Conditions**: Ensure good lighting for optimal barcode scanning performance.
- **Barcode Type**: Currently supports PDF417 barcodes (standard for North American driver's licenses).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and for demonstration purposes.

## 🙏 Acknowledgments

- [Barcode Detection API](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API)
- [AAMVA Standard](https://www.aamva.org/) for driver's license data formats
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)
