import GameChart from '@/components/GameChart'
import SearchBar from '@/components/SearchBar'
import { useEffect, useState } from 'react'
import { Game, getDefaultGames } from './game.service'
import styles from './page.module.css'

export default function App() {
	const [games, setGames] = useState<Game[]>([])
	const [loading, setLoading] = useState(true)

	const fetchDefaultGames = async () => {
		const result = await getDefaultGames()
		setGames(result)
		setLoading(false)
	}

	useEffect(() => {
		fetchDefaultGames()
	}, [])

	return (
		<div className={styles.container}>
			<h1>HLTB Lite</h1>
			<h3>
				Visualize game completion data from{' '}
				<a href="https://howlongtobeat.com" target="_blank" rel="noreferrer">
					HowLongToBeat
				</a>
			</h3>
			{loading ? (
				<div className={styles.loadingContainer}>
					<div className={styles.loader}></div>
					<div className={styles.loadingText}>Loading completion data...</div>
				</div>
			) : (
				<div>
					<SearchBar games={games} setGames={setGames} />
					{games.length ? (
						<GameChart games={games} setGames={setGames} />
					) : (
						<></>
					)}
				</div>
			)}
			<footer>
				<div>
					Made by{' '}
					<a
						href="https://thivagar.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Thivagar Nadarajan
					</a>
				</div>
			</footer>
		</div>
	)
}
