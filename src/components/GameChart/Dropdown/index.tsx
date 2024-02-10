import { FC, useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { RiCloseFill } from 'react-icons/ri'

import './Dropdown.css'

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
		<div className="dropdown-container" ref={node}>
			<div
				className={`dropdown-selection ${dropdownOpen ? 'selection-highlight' : ''}`}
			>
				{selected.length ? (
					selected.map((s, idx) => (
						<div key={idx} className="selected">
							<span className="selected-chip">{s}</span>
							<span
								className="remove"
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
					<span className="placeholder">Select...</span>
				)}
				{selected.length !== options.length ? (
					<div
						onClick={() => setdropdownOpen(!dropdownOpen)}
						className="dropdown-toggle"
					>
						<IoIosArrowDown />
					</div>
				) : (
					<></>
				)}
			</div>
			{dropdownOpen ? (
				<div className="options">
					{selected.length !== options.length ? (
						<li onClick={() => setSelected(options)} className="option">
							All
						</li>
					) : (
						<li className="empty-option">...</li>
					)}
					{options
						.filter((option) => !selected.includes(option))
						.map((option, idx) => (
							<li
								key={idx}
								onClick={() => setSelected(selected.concat(option))}
								className="option"
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
