import { HowLongToBeatService } from 'howlongtobeat'

const hltbService = new HowLongToBeatService()

// From https://github.com/vercel/next.js/discussions/50497, needed for prerender error
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
	try {
		const gamesMatch = req.headers.get('game')

		const games = await hltbService.search(gamesMatch || '')
		return Response.json({ games: games.slice(0, 10) })
	} catch {
		return Response.error()
	}
}
