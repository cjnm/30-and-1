import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import JobAlert from "@/lib/models/JobAlert";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const alerts = await JobAlert.find({ email, isActive: true }).lean();

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Error fetching job alerts:", error);
    return NextResponse.json(
      { error: "Failed to fetch job alerts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Check if alert already exists for this email with similar criteria
    const existingAlert = await JobAlert.findOne({
      email: body.email,
      keywords: { $all: body.keywords },
      location: body.location,
      jobType: body.jobType,
      remote: body.remote,
    });

    if (existingAlert) {
      return NextResponse.json(
        { error: "Similar job alert already exists" },
        { status: 409 }
      );
    }

    const alert = new JobAlert(body);
    await alert.save();

    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    console.error("Error creating job alert:", error);
    return NextResponse.json(
      { error: "Failed to create job alert" },
      { status: 500 }
    );
  }
}
