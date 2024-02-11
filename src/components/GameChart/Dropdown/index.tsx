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
		<div
			className={styles.dropdownContainer}
			ref={node}
			onClick={() => setdropdownOpen(!dropdownOpen)}
		>
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
				<div className={styles.dropdownToggle}>
					<IoIosArrowDown />
				</div>
			</div>
			{dropdownOpen && (
				<ul className={styles.options}>
					{options.map((option, idx) => {
						const isSelected = selected.includes(option)
						const newSelection = isSelected
							? selected.filter((selectedOption) => selectedOption !== option)
							: selected.concat(option)
						return (
							<div
								key={idx}
								onClick={(e) => {
									e.stopPropagation()
									setSelected(newSelection)
								}}
								className={styles.option}
							>
								<input type="checkbox" checked={isSelected} />
								{option}
							</div>
						)
					})}
				</ul>
			)}
		</div>
	)
}

export default Dropdown
