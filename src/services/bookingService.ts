// Booking service for handling reservation-related business logic

import { Booking } from '@/models';

export class BookingService {
  private static mockBookings: Booking[] = [];

  static async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.mockBookings.push(newBooking);
    return newBooking;
  }

  static async getBookingById(id: string): Promise<Booking | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockBookings.find(booking => booking.id === id) || null;
  }

  static async getUserBookings(userId: string): Promise<Booking[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return this.mockBookings.filter(booking => booking.userId === userId);
  }

  static async updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const bookingIndex = this.mockBookings.findIndex(booking => booking.id === id);
    if (bookingIndex === -1) return null;

    this.mockBookings[bookingIndex] = {
      ...this.mockBookings[bookingIndex],
      status,
      updatedAt: new Date()
    };

    return this.mockBookings[bookingIndex];
  }

  static async cancelBooking(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const booking = await this.updateBookingStatus(id, 'cancelled');
    return booking !== null;
  }

  static calculateTotalPrice(pricePerNight: number, checkIn: Date, checkOut: Date): number {
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return pricePerNight * nights;
  }

  static validateBookingDates(checkIn: Date, checkOut: Date): { isValid: boolean; error?: string } {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (checkIn < now) {
      return { isValid: false, error: 'Check-in date cannot be in the past' };
    }

    if (checkOut <= checkIn) {
      return { isValid: false, error: 'Check-out date must be after check-in date' };
    }

    const maxAdvanceBooking = new Date();
    maxAdvanceBooking.setMonth(maxAdvanceBooking.getMonth() + 12);

    if (checkIn > maxAdvanceBooking) {
      return { isValid: false, error: 'Cannot book more than 12 months in advance' };
    }

    return { isValid: true };
  }
}
