// Hotel related data models and types

export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  checkInTime: string;
  checkOutTime: string;
  policies: {
    cancellation: string;
    petPolicy: string;
    smokingPolicy: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  hotelId: string;
  type: string;
  name: string;
  description: string;
  maxOccupancy: number;
  amenities: string[];
  images: string[];
  pricePerNight: number;
  isAvailable: boolean;
  size: number; // in square feet
  bedType: string;
  smokingAllowed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  preferences: {
    roomType?: string;
    amenities?: string[];
    priceRange?: {
      min: number;
      max: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  hotelId: string;
  bookingId: string;
  rating: number; // 1-5 stars
  title: string;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  destination?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  guests?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  amenities?: string[];
  rating?: number;
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResults {
  hotels: Hotel[];
  totalCount: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
