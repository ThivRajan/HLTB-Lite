import { HowLongToBeatService } from 'howlongtobeat'

const hltbService = new HowLongToBeatService()

export async function GET(req: Request) {
	try {
		const gamesMatch = req.headers.get('game')

		const games = await hltbService.search(gamesMatch || '')
		return Response.json({ games: games.slice(0, 10) })
	} catch {
		return Response.error()
	}
}
