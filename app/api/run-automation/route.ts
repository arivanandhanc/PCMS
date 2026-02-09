import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Build HTML table for email
    const itemsHtml = body.items
      .map((i: any) => {
        return `
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">
              <img src="${i.image}" width="80" />
            </td>
            <td style="padding:10px;border:1px solid #ddd;">
              ${i.title}
            </td>
            <td style="padding:10px;border:1px solid #ddd;">
              Qty: ${i.qty}
            </td>
            <td style="padding:10px;border:1px solid #ddd;">
              ₹ ${i.price}
            </td>
          </tr>
        `;
      })
      .join("");

    // ✅ Send CLEAN payload to Automations
    const automatePayload = {
      email: body.email,
      total: body.total,
      paymentId: body.paymentId,
      itemsHtml, // ⭐ this is what email will render
    };

    const res = await fetch(
      process.env.CONTENTSTACK_AUTOMATE_ENDPOINT_ORDER!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ah-http-key":
            process.env.CONTENTSTACK_AUTOMATE_API_KEY_ORDER!, // ✅ correct header
        },
        body: JSON.stringify(automatePayload), // ✅ send formatted payload
      }
    );

    const text = await res.text();
    console.log("Automation response:", text);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Automation error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
