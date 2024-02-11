import { showErrorMessage } from '@/utils/error.util'
import { Game } from '../models/game.model'

export const getDefaultGames = async (): Promise<Game[]> => {
	return await getSearchedGames()
}

export const getSearchedGames = async (game = ''): Promise<Game[]> => {
	try {
		const response = await fetch(`api/games`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				game,
			},
		})
		const responseJSON = await response.json()
		return (responseJSON.games || []) as Game[]
	} catch {
		showErrorMessage('Unable to get games')
		return []
	}
}
