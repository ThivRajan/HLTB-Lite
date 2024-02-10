import { FC, useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { RiCloseFill } from 'react-icons/ri'

import styles from './dropdown.module.css'

const Dropdown: FC<{
	options: string[]
	selected: string[]
	setSelected: React.Dispatch<React.SetStateAction<string[]>>
}> = ({ options, selected, setSelected }) => {
	const [dropdownOpen, setdropdownOpen] = useState(false)
	const node = useRef<HTMLDivElement>(null)

	useEffect(() => {
		document.addEventListener('mousedown', handleClick)
	}, [])

	const handleClick = (event: MouseEvent) => {
		if (node.current && !node.current.contains(event.target as Node)) {
			setdropdownOpen(false)
		}
	}

	return (
		<div className={styles.dropdownContainer} ref={node}>
			<div
				className={`${styles.dropdownSelection} ${dropdownOpen ? styles.selectionHighlight : ''}`}
			>
				{selected.length ? (
					selected.map((s, idx) => (
						<div key={idx} className={styles.selected}>
							<span className={styles.selectedChip}>{s}</span>
							<span
								className={styles.remove}
								onClick={(event) => {
									event.stopPropagation()
									setSelected(selected.filter((r) => s !== r))
								}}
							>
								<RiCloseFill />
							</span>
						</div>
					))
				) : (
					<span className={styles.placeholder}>Select...</span>
				)}
				{selected.length !== options.length ? (
					<div
						onClick={() => setdropdownOpen(!dropdownOpen)}
						className={styles.dropdownToggle}
					>
						<IoIosArrowDown />
					</div>
				) : (
					<></>
				)}
			</div>
			{dropdownOpen ? (
				<div className={styles.options}>
					{selected.length !== options.length ? (
						<li onClick={() => setSelected(options)} className={styles.option}>
							All
						</li>
					) : (
						<li className={styles.emptyOption}>...</li>
					)}
					{options
						.filter((option) => !selected.includes(option))
						.map((option, idx) => (
							<li
								key={idx}
								onClick={() => setSelected(selected.concat(option))}
								className={styles.option}
							>
								{option}
							</li>
						))}
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default Dropdown
