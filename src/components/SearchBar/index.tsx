import { Game } from '@/app/game.model'
import { getSearchedGames } from '@/app/game.service'
import debounce from 'lodash.debounce'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { MdAddChart } from 'react-icons/md'
import styles from './searchBar.module.css'

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
		debouncedSearch(event.target.value.trim())
	}

	const debouncedSearch = debounce((searchVal: string) => {
		fetchSearchedGames(searchVal)
	}, 300)

	const addGame = (game: Game) => {
		if (!games.some((currentGame) => currentGame.name === game.name)) {
			setGames(games.concat(game))
		}
	}

	return (
		<div className={styles.searchContainer} ref={node}>
			<input
				type="text"
				className={`${styles.searchBar} ${searchResults.length && searchOpen ? styles.searchBarOpen : ''}`}
				onClick={() => setSearchOpen(true)}
				onChange={handleSearchChange}
				placeholder={'Search for games'}
			/>
			{searchResults.length && searchOpen ? (
				<div className={styles.resultsContainer}>
					{searchResults.map((game) => (
						<div
							key={game.id}
							className={styles.resultEntry}
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
							<div className={styles.resultInfo}>
								<span className={styles.resultTitle}>{game.name}</span>
								<div className={styles.completionTags}>
									<span>{`Main: ${game.gameplayMain} hrs`}</span>
									<span>{`Extra: ${game.gameplayMainExtra} hrs`}</span>
									<span>{`Cmpl: ${game.gameplayCompletionist} hrs`}</span>
								</div>
							</div>
							<MdAddChart className={styles.chartIcon} />
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
