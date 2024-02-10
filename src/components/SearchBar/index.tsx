import { Game, getSearchedGames } from '@/app/game.service'
import _ from 'lodash'
import {
	ChangeEvent,
	FC,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import './SearchBar.css'

const SearchBar: FC<{
	games: Game[]
	setGames: React.Dispatch<React.SetStateAction<Game[]>>
}> = ({ games, setGames }): JSX.Element => {
	const [searchOpen, setSearchOpen] = useState(false)
	const [searchResults, setSearchResults] = useState<Game[]>([])

	const node = useRef<HTMLDivElement>(null)

	useEffect(() => {
		document.addEventListener('mousedown', handleClick)
	}, [])

	const handleClick = (event: MouseEvent) => {
		if (node.current && !node.current.contains(event.target as Node)) {
			setSearchOpen(false)
		}
	}

	const fetchSearchedGames = async (search: string) => {
		const results = search ? await getSearchedGames(search) : []
		setSearchResults(results)
	}

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		debounce(event.target.value.trim())
	}

	const debounce = useCallback(
		_.debounce((_searchVal: string) => {
			fetchSearchedGames(_searchVal)
		}, 300),
		[],
	)

	const addGame = (game: Game) => {
		if (!games.some((currentGame) => currentGame.name === game.name)) {
			setGames(games.concat(game))
		}
	}

	return (
		<div className="search-container" ref={node}>
			<input
				type="text"
				className={`search-bar ${searchResults.length && searchOpen ? 'search-bar-open' : ''}`}
				onClick={() => setSearchOpen(true)}
				onChange={(event) => handleSearchChange(event)}
				placeholder={'Search for games'}
			/>
			{searchResults.length && searchOpen ? (
				<div className="results-container">
					{searchResults.map((game) => (
						<div
							key={game.id}
							className="result-entry"
							onClick={() => {
								if (games.length < 15) {
									addGame(game)
								} else {
									window.alert(
										'There can only be a maximum of 15 games in the chart, clear the chart to add more games.',
									)
								}
							}}
						>
							<div className="result-info">
								<span className="result-title">{game.name}</span>
								<div className="completion-tags">
									<span className="completion-tag main-tag">{`Main: ${game.gameplayMain} hrs`}</span>
									<span className="completion-tag extra-tag">{`Extra: ${game.gameplayMainExtra} hrs`}</span>
									<span className="completion-tag complete-tag">{`Cmpl: ${game.gameplayCompletionist} hrs`}</span>
								</div>
							</div>
							Chart Icon
						</div>
					))}
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default SearchBar
