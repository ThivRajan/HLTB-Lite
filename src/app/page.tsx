'use client'

import GameChart from '@/components/GameChart'
import Loader from '@/components/Loader'
import SearchBar from '@/components/SearchBar'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Game } from '../models/game.model'
import { getDefaultGames } from '../utils/game.util'
import styles from './page.module.css'

export default function Home() {
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
				<Loader isLoading={loading} />
			) : (
				<div>
					<SearchBar games={games} setGames={setGames} />
					{!!games.length && <GameChart games={games} setGames={setGames} />}
				</div>
			)}
			<footer>
				<span>Made by</span>
				<a
					href="https://thivagar.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Thivagar Nadarajan
				</a>
			</footer>
			<ToastContainer
				position="top-center"
				autoClose={800}
				hideProgressBar={true}
				closeOnClick
				rtl={false}
				theme="dark"
				style={{ fontSize: '1.2em' }}
			/>
		</div>
	)
}
