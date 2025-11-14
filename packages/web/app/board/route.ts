import posts from '@zpublish/components/data/zecpages_feed.json';

export async function GET() {
  return Response.json(posts)
}