// Hotel service for handling hotel-related business logic

import { Hotel, SearchFilters, SearchResults } from '@/models';

export class HotelService {
  // Mock data for demonstration - in a real app, this would connect to a database
  private static mockHotels: Hotel[] = [
    {
      id: '1',
      name: 'Grand Palace Hotel',
      description: 'A luxurious 5-star hotel in the heart of the city with world-class amenities and exceptional service.',
      address: {
        street: '123 Royal Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10001'
      },
      coordinates: {
        latitude: 40.7589,
        longitude: -73.9851
      },
      amenities: ['Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Concierge', 'Valet Parking'],
      images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=600&fit=crop'],
      rating: 4.8,
      reviewCount: 1247,
      priceRange: {
        min: 299,
        max: 899
      },
      contactInfo: {
        phone: '+1-555-0123',
        email: 'info@grandpalacehotel.com',
        website: 'https://grandpalacehotel.com'
      },
      checkInTime: '15:00',
      checkOutTime: '11:00',
      policies: {
        cancellation: 'Free cancellation up to 24 hours before check-in',
        petPolicy: 'Pets allowed with additional fee',
        smokingPolicy: 'Non-smoking property'
      },
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-12-01')
    },
    {
      id: '2',
      name: 'Seaside Resort & Spa',
      description: 'Beachfront resort offering stunning ocean views, premium spa services, and luxury accommodations.',
      address: {
        street: '456 Ocean Drive',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        zipCode: '33139'
      },
      coordinates: {
        latitude: 25.7617,
        longitude: -80.1918
      },
      amenities: ['Free WiFi', 'Beach Access', 'Pool', 'Spa', 'Restaurant', 'Water Sports', 'Tennis Court'],
      images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop'],
      rating: 4.6,
      reviewCount: 892,
      priceRange: {
        min: 199,
        max: 599
      },
      contactInfo: {
        phone: '+1-555-0456',
        email: 'reservations@seasideresort.com',
        website: 'https://seasideresort.com'
      },
      checkInTime: '16:00',
      checkOutTime: '10:00',
      policies: {
        cancellation: 'Free cancellation up to 48 hours before check-in',
        petPolicy: 'No pets allowed',
        smokingPolicy: 'Designated smoking areas only'
      },
      createdAt: new Date('2023-03-20'),
      updatedAt: new Date('2024-11-15')
    },
    {
      id: '3',
      name: 'Mountain View Lodge',
      description: 'Cozy mountain retreat perfect for nature lovers, featuring rustic charm and modern comfort.',
      address: {
        street: '789 Alpine Road',
        city: 'Aspen',
        state: 'CO',
        country: 'USA',
        zipCode: '81611'
      },
      coordinates: {
        latitude: 39.1911,
        longitude: -106.8175
      },
      amenities: ['Free WiFi', 'Fireplace', 'Hiking Trails', 'Restaurant', 'Bar', 'Ski Storage'],
      images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'],
      rating: 4.4,
      reviewCount: 567,
      priceRange: {
        min: 149,
        max: 399
      },
      contactInfo: {
        phone: '+1-555-0789',
        email: 'info@mountainviewlodge.com'
      },
      checkInTime: '15:00',
      checkOutTime: '11:00',
      policies: {
        cancellation: 'Free cancellation up to 72 hours before check-in',
        petPolicy: 'Pets welcome with advance notice',
        smokingPolicy: 'Non-smoking property'
      },
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date('2024-10-30')
    }
  ];

  static async getAllHotels(): Promise<Hotel[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockHotels;
  }

  static async getHotelById(id: string): Promise<Hotel | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockHotels.find(hotel => hotel.id === id) || null;
  }

  static async searchHotels(filters: SearchFilters): Promise<SearchResults> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredHotels = [...this.mockHotels];

    // Apply destination filter
    if (filters.destination) {
      const destination = filters.destination.toLowerCase();
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.address.city.toLowerCase().includes(destination) ||
        hotel.address.state.toLowerCase().includes(destination) ||
        hotel.name.toLowerCase().includes(destination)
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.priceRange.min >= (filters.priceRange?.min || 0) &&
        hotel.priceRange.max <= (filters.priceRange?.max || Infinity)
      );
    }

    // Apply rating filter
    if (filters.rating) {
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.rating >= filters.rating!
      );
    }

    // Apply amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      filteredHotels = filteredHotels.filter(hotel =>
        filters.amenities!.every(amenity =>
          hotel.amenities.includes(amenity)
        )
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredHotels.sort((a, b) => {
        let comparison = 0;
        
        switch (filters.sortBy) {
          case 'price':
            comparison = a.priceRange.min - b.priceRange.min;
            break;
          case 'rating':
            comparison = b.rating - a.rating; // Higher rating first
            break;
          case 'popularity':
            comparison = b.reviewCount - a.reviewCount; // More reviews first
            break;
          default:
            comparison = 0;
        }

        return filters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    const page = 1; // For simplicity, always return page 1
    const limit = 10;
    const totalCount = filteredHotels.length;

    return {
      hotels: filteredHotels,
      totalCount,
      page,
      limit,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }

  static async getFeaturedHotels(limit: number = 3): Promise<Hotel[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return this.mockHotels
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}
