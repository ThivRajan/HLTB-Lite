import { CompletionType } from '@/enums/completion-type.enum'
import { FC, useEffect, useState } from 'react'
import { BsEraserFill } from 'react-icons/bs'
import { RiCloseFill } from 'react-icons/ri'
import {
	Bar,
	BarChart,
	Cell,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import styles from './gameChart.module.css'

import { Game } from '@/models/game.model'
import Dropdown from './Dropdown'

const GameChart: FC<{
	games: Game[]
	setGames: React.Dispatch<React.SetStateAction<Game[]>>
}> = ({ games, setGames }): JSX.Element => {
	const [completionTypes, setCompletionTypes] = useState<string[]>(
		Object.values(CompletionType),
	)
	const [isMobile, setIsMobile] = useState(false)
	const [editMode, setEditMode] = useState(false)

	const barColors = {
		[CompletionType.Main]: '#e15127',
		[CompletionType.Extra]: '#c4b693',
		[CompletionType.Complete]: '#1e5982',
	}

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth <= 600) {
				setIsMobile(true)
			} else {
				setIsMobile(false)
			}
		})
	})

	const chartData = games.map((game) => ({
		title: game.name,
		...(completionTypes.includes(CompletionType.Main)
			? { [CompletionType.Main]: game.gameplayMain }
			: {}),
		...(completionTypes.includes(CompletionType.Extra)
			? { [CompletionType.Extra]: game.gameplayMainExtra }
			: {}),
		...(completionTypes.includes(CompletionType.Complete)
			? { [CompletionType.Complete]: game.gameplayCompletionist }
			: {}),
	}))

	return (
		<div className={styles.chartContainer}>
			<div className={styles.chartOptions}>
				<Dropdown
					options={Object.values(CompletionType)}
					selected={completionTypes}
					setSelected={setCompletionTypes}
				/>
				<div className={styles.chartControls}>
					<button
						className={`${styles.chartControl} ${styles.editChart} ${editMode && styles.editEnabled}`}
						onClick={() => setEditMode(!editMode)}
					>
						<BsEraserFill />
					</button>
					<button
						className={`${styles.chartControl} ${styles.clearChart}`}
						onClick={() => setGames([])}
					>
						<RiCloseFill />
					</button>
				</div>
			</div>
			{completionTypes.length ? (
				<div className={styles.chartContent}>
					<ResponsiveContainer
						width={Math.max(1000, 100 * games.length)}
						height={isMobile ? 500 : 600}
					>
						<BarChart
							margin={{ right: 50 }}
							data={chartData}
							className={styles.chart}
						>
							<XAxis
								dataKey="title"
								angle={60}
								textAnchor="start"
								height={300}
								width={300}
								interval={0}
								stroke={'#b4bdc3'}
							/>
							<YAxis stroke={'#b4bdc3'} />
							<Tooltip
								cursor={
									<CustomCursor
										games={games}
										setGames={setGames}
										editMode={editMode}
									/>
								}
								{...(editMode ? { content: CustomTooltip } : {})}
							/>
							{Object.values(CompletionType).map((type, idx) => (
								<Bar dataKey={type} fill={barColors[type]} key={idx}>
									{editMode &&
										chartData.map((entry, index) => (
											<Cell
												key={index}
												onClick={() => {
													setGames(
														games.filter((game) => game.name != entry.title),
													)
												}}
												style={{ cursor: 'pointer' }}
											/>
										))}
								</Bar>
							))}
						</BarChart>
					</ResponsiveContainer>
				</div>
			) : (
				<div>No completion types selected...</div>
			)}
		</div>
	)
}

const CustomCursor = (props?: {
	x?: number
	y?: number
	width?: number
	height?: number
	payload?: any
	games: Game[]
	setGames: React.Dispatch<React.SetStateAction<Game[]>>
	editMode?: boolean
}) => {
	if (!props) return

	const { x, y, width, height, payload, games, setGames, editMode } = props
	return (
		<Rectangle
			strokeWidth="2px"
			fill={editMode ? '#fa9696' : '#bde0ff'}
			x={x}
			y={y}
			width={width}
			height={height}
			onClick={
				editMode
					? () =>
							setGames(
								games.filter((game) => game.name != payload[0].payload.title),
							)
					: () => null
			}
			style={editMode ? { cursor: 'pointer' } : {}}
		/>
	)
}

const CustomTooltip = () => {
	return <div className={styles.removalTooltip}>Remove game from chart</div>
}

export default GameChart
