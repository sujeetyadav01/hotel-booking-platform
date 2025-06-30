import { NextRequest, NextResponse } from 'next/server';
import { HotelService } from '@/services/hotelService';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Hotel ID is required' },
        { status: 400 }
      );
    }

    const hotel = await HotelService.getHotelById(id);

    if (!hotel) {
      return NextResponse.json(
        { success: false, error: 'Hotel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: hotel });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hotel' },
      { status: 500 }
    );
  }
}
