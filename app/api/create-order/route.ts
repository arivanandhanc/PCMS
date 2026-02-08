import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { amount } = body;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100, // paise
    currency: "INR",
    receipt: "receipt_order_1",
  });

  return NextResponse.json(order);
}
