export interface Game {
	description: string
	gameplayCompletionist: number
	gameplayMain: number
	gameplayMainExtra: number
	id: string
	imageUrl: string
	name: string
	platforms: string[]
	playableOn: string[]
	similarity: number
	timeLabels: string[][]
}

export const getDefaultGames = async (): Promise<Game[]> => {
	return await getSearchedGames()
}

export const getSearchedGames = async (game = ''): Promise<Game[]> => {
	const response = await fetch(`api/games`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			game,
		},
	})
	const responseJSON = await response.json()
	return (responseJSON.games || []) as Game[]
}
