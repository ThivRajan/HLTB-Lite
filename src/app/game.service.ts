const baseUrl = 'https://tan-seal-slip.cyclic.app'

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
	const gamesResponse = await fetch(`${baseUrl}/games`)
	const gamesJSON = await gamesResponse.json()
	return gamesJSON.data as Game[]
}

export const getSearchedGames = async (game: string): Promise<Game[]> => {
	const gamesResponse = await fetch(`${baseUrl}/games/${game}`)
	const gamesJSON = await gamesResponse.json()
	return gamesJSON.data as Game[]
}
