# Route Form Booking App

A modern booking form built with Next.js, React, MUI (Material UI), and TailwindCSS, featuring date & time pickers, dynamic pickup/drop selection, passenger input, and contact recognition. Includes Cypress end-to-end tests for validation and booking flows.

## ✨ Features

- **Smart Contact Recognition** – Automatically detects returning customers based on phone number
- **Real-time Form Validation** – Instant feedback with comprehensive validation rules
- **Location Picker** – Airport and general location options with intelligent filtering
- **Passenger Count Validation** – Range validation (1-20 passengers)
- **Dynamic Contact Fields** – Additional fields appear for new phone numbers
- **Returning Customer Auto-fill** – Pre-filled contact info for recognized numbers
- **Validation Errors** – Clear error messages for empty or invalid fields
- **Snackbar Notifications** – Success/error feedback with Material-UI Snackbar
- **Responsive Design** – Fully responsive layout for all devices

## 🛠️ Tech Stack

- **Next.js 16** – React framework with App Router
- **React 19** – UI library
- **TypeScript** – Type safety and developer experience
- **Material UI 7** – UI components with custom theming
- **TailwindCSS 4** – Utility-first styling
- **Day.js** – Date and time handling
- **Cypress** – End-to-end testing
- **LocalStorage** – Client-side contact storage

## 🚀 Getting Started

### Prerequisites
- Node.js v20 or higher
- npm v9 or higher
- Google Maps API key (for distance calculations)

### Installation

1. **Clone the repository:**
   ```bash
   https://github.com/Vaibhav-Kotadiya-Dev/route-form
   cd route-form

2. **Install dependencies:**
   ```bash
   npm install
3. **Set up environment variables::**
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
4. **Run the development server:**
   ```bash
   npm run dev


## 🧪 Running Tests

### End-to-End Tests with Cypress

The project includes comprehensive Cypress tests for validating the booking form functionality.

#### Option 1: Interactive Test Runner (GUI)

Open the Cypress Test Runner to visually see tests running in a browser:

```bash
npm run cypress:open
