import { Webhook } from 'svix';
import Connection from "@/lib/db";
import userModel from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    const evt = wh.verify(payload, headers);

    if (evt.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = evt.data;
      
      await Connection();
      
      const newUser = await userModel.create({
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
      });

      return NextResponse.json({ success: true, user: newUser });
    }

    if (evt.type === 'user.updated') {
      const { id, email_addresses, first_name, last_name } = evt.data;
      
      await Connection();
      
      await userModel.findOneAndUpdate(
        { clerkId: id },
        {
          email: email_addresses[0].email_address,
          firstName: first_name,
          lastName: last_name,
        }
      );

      return NextResponse.json({ success: true });
    }

    if (evt.type === 'user.deleted') {
      const { id } = evt.data;
      
      await Connection();
      await userModel.deleteOne({ clerkId: id });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}