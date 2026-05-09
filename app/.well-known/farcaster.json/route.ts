import { NextResponse } from "next/server";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.vercel.app";

  return NextResponse.json({
    accountAssociation: {
      header: "eyJmaWQiOiA...", // Replace with your developer FID header
      payload: "eyJkb21haW4iOi...",
      signature: "...",
    },
    frame: {
      version: "1",
      name: "Press To Start",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/og-image.png`,
      buttonTitle: "Launch Game",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#050510",
    },
  });
}
