import { NextRequest, NextResponse } from "next/server";
import { BookingSubmission, BookingResponse } from "@/app/types/booking";
import { calculateRouteDistance } from "@/app/utils/distance";
import { locationMap } from "@/app/utils/locations";

const BASE_FARE_USD = 5;
const RATE_PER_KM_USD = 1.8;
const RATE_PER_MINUTE_USD = 0.35;

function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BK-${timestamp}-${random}`;
}

function estimateFare(distanceKm: number, durationMinutes: number): number {
  const fare = BASE_FARE_USD + distanceKm * RATE_PER_KM_USD + durationMinutes * RATE_PER_MINUTE_USD;
  return Math.round(fare * 100) / 100;
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingSubmission = await request.json();

    if (!body.pickupLocation || !body.dropLocation) {
      return NextResponse.json(
        { success: false, message: "Pickup and drop-off locations are required." },
        { status: 400 }
      );
    }

    if (!body.contactNumber || !/^[0-9]{10}$/.test(body.contactNumber)) {
      return NextResponse.json(
        { success: false, message: "A valid 10-digit contact number is required." },
        { status: 400 }
      );
    }

    if (!body.passengers || parseInt(body.passengers, 10) < 1) {
      return NextResponse.json(
        { success: false, message: "At least 1 passenger is required." },
        { status: 400 }
      );
    }

    const waypoints = [
      locationMap[body.pickupLocation],
      ...(body.stops ?? []).filter(Boolean).map((s: string) => locationMap[s]),
      locationMap[body.dropLocation],
    ].filter(Boolean) as string[];

    const { distanceKm, durationMinutes } = await calculateRouteDistance(waypoints);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const bookingId = generateBookingId();
    const estimatedFare = estimateFare(distanceKm, durationMinutes);

    const responsePayload: BookingResponse = {
      success: true,
      bookingId,
      message: "Your booking has been confirmed!",
      estimatedFare,
      data: { ...body, distanceKm, durationMinutes, status: "confirmed", createdAt: new Date().toISOString() } as unknown as BookingSubmission,
    };

    return NextResponse.json(responsePayload, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isGoogleError =
      message.includes("Distance Matrix") ||
      message.includes("Element status") ||
      message.includes("REQUEST_DENIED") ||
      message.includes("INVALID_REQUEST") ||
      message.includes("API key");

    console.error("[/api/booking] Error:", {
      source: isGoogleError ? "Google Maps API" : "Internal",
      message,
      stack: err instanceof Error ? err.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        source: isGoogleError ? "Google Maps API" : "Internal",
        message: isGoogleError
          ? `Google Maps error: ${message}`
          : "Something went wrong. Please try again.",
        detail: message,
      },
      { status: 500 }
    );
  }
}
