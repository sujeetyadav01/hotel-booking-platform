import { NextRequest, NextResponse } from 'next/server';
import { HotelService } from '@/services/hotelService';
import { SearchFilters } from '@/models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Check if this is a search request or get all hotels
    const destination = searchParams.get('destination');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const rating = searchParams.get('rating');
    const amenities = searchParams.get('amenities');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');
    const featured = searchParams.get('featured');

    // If featured flag is set, return featured hotels
    if (featured === 'true') {
      const limit = parseInt(searchParams.get('limit') || '3');
      const hotels = await HotelService.getFeaturedHotels(limit);
      return NextResponse.json({ success: true, data: hotels });
    }

    // If any search parameters are provided, perform a search
    if (destination || checkIn || checkOut || guests || minPrice || maxPrice || rating || amenities || sortBy) {
      const filters: SearchFilters = {};

      if (destination) filters.destination = destination;
      if (checkIn) filters.checkInDate = new Date(checkIn);
      if (checkOut) filters.checkOutDate = new Date(checkOut);
      if (guests) filters.guests = parseInt(guests);
      if (minPrice || maxPrice) {
        filters.priceRange = {
          min: minPrice ? parseInt(minPrice) : 0,
          max: maxPrice ? parseInt(maxPrice) : Infinity
        };
      }
      if (rating) filters.rating = parseFloat(rating);
      if (amenities) filters.amenities = amenities.split(',');
      if (sortBy) filters.sortBy = sortBy as 'price' | 'rating' | 'distance' | 'popularity';
      if (sortOrder) filters.sortOrder = sortOrder as 'asc' | 'desc';

      const searchResults = await HotelService.searchHotels(filters);
      return NextResponse.json({ success: true, data: searchResults });
    }

    // Otherwise, return all hotels
    const hotels = await HotelService.getAllHotels();
    return NextResponse.json({ success: true, data: hotels });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
}
