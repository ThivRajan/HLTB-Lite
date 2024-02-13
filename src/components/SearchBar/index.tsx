import { Game } from '@/models/game.model'
import { getSearchedGames } from '@/utils/game.util'
import debounce from 'lodash.debounce'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { MdAddChart } from 'react-icons/md'
import { Oval } from 'react-loader-spinner'
import styles from './searchBar.module.css'

const SearchBar: FC<{
	games: Game[]
	setGames: React.Dispatch<React.SetStateAction<Game[]>>
}> = ({ games, setGames }): JSX.Element => {
	const [searchOpen, setSearchOpen] = useState(false)
	const [searchResults, setSearchResults] = useState<Game[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const node = useRef<HTMLDivElement>(null)

	useEffect(() => {
		document.addEventListener('mousedown', handleClick)
	}, [])

	useEffect(() => {
		if (isLoading) {
			setIsLoading(false)
		}
	}, [searchResults])

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
		setIsLoading(true)
		fetchSearchedGames(searchVal)
	}, 300)

	const addGame = (game: Game) => {
		if (!games.some((currentGame) => currentGame.name === game.name)) {
			setGames(games.concat(game))
		}
	}

	return (
		<div className={styles.searchContainer} ref={node}>
			<div
				className={`${styles.searchBar} ${searchResults.length && searchOpen ? styles.searchBarOpen : ''}`}
			>
				<input
					type="text"
					onClick={() => setSearchOpen(true)}
					onChange={handleSearchChange}
					placeholder={'Search for games'}
				/>
				<Oval
					height={30}
					width={30}
					color="#88c2f5"
					secondaryColor="#88c2f5"
					visible={isLoading}
					ariaLabel="oval-loading"
					strokeWidth={4}
					strokeWidthSecondary={4}
				/>
			</div>
			{searchResults.length && searchOpen ? (
				<div className={styles.resultsContainer}>
					{searchResults.map((game) => (
						<div
							key={game.id}
							className={styles.resultEntry}
							onClick={() => {
								addGame(game)
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
