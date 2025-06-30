# Imran Juma - Hotel Booking Platform

A modern hotel booking platform built with Next.js, TypeScript, and Tailwind CSS, following MVC (Model-View-Controller) architecture patterns.

## 🏨 Features

- **Hotel Search & Discovery**: Find hotels by destination, dates, and preferences
- **Detailed Hotel Views**: Comprehensive hotel information with image galleries
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **MVC Architecture**: Well-structured codebase following best practices
- **Type Safety**: Full TypeScript implementation for better development experience

## 🏗️ Architecture

This project follows the MVC (Model-View-Controller) pattern:

### Models (`src/models/`)
- **Data Structures**: Hotel, Room, Booking, User, Review interfaces
- **Type Definitions**: SearchFilters, SearchResults, and other TypeScript types

### Views (`src/components/` & `src/app/`)
- **Components**: Reusable UI components (Header, Footer, HotelCard, SearchBar)
- **Pages**: Next.js App Router pages for different routes
- **Layout**: Responsive layouts with consistent design

### Controllers (`src/services/` & `src/app/api/`)
- **Services**: Business logic for hotel operations (HotelService, BookingService)
- **API Routes**: Next.js API endpoints for data handling
- **Data Management**: Mock data services (ready for database integration)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel-site
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
hotel-site/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (Controllers)
│   │   ├── hotels/            # Hotel pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components (Views)
│   │   ├── ui/               # UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HotelCard.tsx
│   │   └── SearchBar.tsx
│   ├── models/               # Data models and types
│   │   └── index.ts
│   ├── services/             # Business logic (Controllers)
│   │   ├── hotelService.ts
│   │   └── bookingService.ts
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Architecture**: MVC pattern
- **Development**: ESLint, PostCSS
- **Images**: Next.js Image optimization with Unsplash placeholders

## 🎯 Features Overview

### Homepage
- Hero section with search functionality
- Featured hotels showcase
- Benefits and features section

### Hotel Listing Page
- Search and filter hotels
- Grid layout with hotel cards
- Loading states and error handling

### Hotel Detail Page
- Comprehensive hotel information
- Image gallery
- Amenities and policies
- Booking form (UI only)
- Contact information

### Search Functionality
- Destination search
- Date range selection
- Guest count specification
- Price range filtering
- Rating-based filtering
- Amenity filtering
- Sorting options

## 🔄 API Endpoints

- `GET /api/hotels` - Get all hotels or search hotels
- `GET /api/hotels/[id]` - Get specific hotel details
- Query parameters for filtering and searching

## 🎨 Design System

- **Colors**: Blue and purple gradient theme
- **Typography**: Inter font family
- **Components**: Consistent button styles, form inputs
- **Responsive**: Mobile-first approach
- **Accessibility**: ARIA labels and semantic HTML

## 🚀 Deployment

The project can be deployed on Vercel, Netlify, or any platform supporting Next.js:

```bash
npm run build
npm start
```

For Vercel deployment:
```bash
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Real booking functionality
- [ ] Payment integration
- [ ] Review and rating system
- [ ] Admin dashboard
- [ ] Database integration
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Map integration
- [ ] Multi-language support
