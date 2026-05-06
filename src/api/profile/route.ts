// import { auth } from "@clerk/nextjs/server";
//
// export async function GET() {
//     const { userId } = auth(); // trusted source
//
//     const profile = await db.user.findUnique({
//         where: { clerk_user_id: userId },
//     });
//
//     return Response.json(profile);
// }