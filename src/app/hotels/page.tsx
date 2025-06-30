'use client';

import { useState, useEffect } from 'react';
import { Hotel, SearchFilters } from '@/models';
import HotelCard from '@/components/HotelCard';
import SearchBar from '@/components/SearchBar';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    loadAllHotels();
  }, []);

  const loadAllHotels = async () => {
    try {
      const response = await fetch('/api/hotels');
      const result = await response.json();
      
      if (result.success) {
        setHotels(result.data);
      } else {
        console.error('Error loading hotels:', result.error);
      }
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (filters: SearchFilters) => {
    setSearchLoading(true);
    try {
      const searchParams = new URLSearchParams();
      
      if (filters.destination) searchParams.set('destination', filters.destination);
      if (filters.checkInDate) searchParams.set('checkIn', filters.checkInDate.toISOString());
      if (filters.checkOutDate) searchParams.set('checkOut', filters.checkOutDate.toISOString());
      if (filters.guests) searchParams.set('guests', filters.guests.toString());
      if (filters.priceRange?.min) searchParams.set('minPrice', filters.priceRange.min.toString());
      if (filters.priceRange?.max) searchParams.set('maxPrice', filters.priceRange.max.toString());
      if (filters.rating) searchParams.set('rating', filters.rating.toString());
      if (filters.amenities) searchParams.set('amenities', filters.amenities.join(','));
      if (filters.sortBy) searchParams.set('sortBy', filters.sortBy);
      if (filters.sortOrder) searchParams.set('sortOrder', filters.sortOrder);

      const response = await fetch(`/api/hotels?${searchParams.toString()}`);
      const result = await response.json();
      
      if (result.success) {
        setHotels(result.data.hotels || result.data);
      } else {
        console.error('Search error:', result.error);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          All Hotels
        </h1>
        <p className="text-lg text-gray-600">
          Discover amazing accommodations for your next trip
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} isLoading={searchLoading} />
      </div>

      {/* Results Section */}
      <div className="mb-6">
        <p className="text-gray-600">
          {searchLoading ? 'Searching...' : `${hotels.length} hotels found`}
        </p>
      </div>

      {/* Hotels Grid */}
      {hotels.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
          <p className="text-gray-600">Try adjusting your search criteria to find more results.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
