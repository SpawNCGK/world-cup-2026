export async function GET() {
  const res = await fetch("https://worldcup26.ir/get/games", {
    next: { revalidate: 30 }
  });
  const data = await res.json();
  return Response.json(data);
}