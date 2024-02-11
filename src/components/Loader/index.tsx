import { Oval } from 'react-loader-spinner'
import styles from './loader.module.css'

export default function Loader({ isLoading }: { isLoading: boolean }) {
	return (
		<div className={styles.container}>
			<Oval
				height={100}
				width={100}
				color="#88c2f5"
				secondaryColor="#88c2f5"
				visible={isLoading}
				ariaLabel="oval-loading"
				strokeWidth={4}
				strokeWidthSecondary={4}
			/>
			<div className={styles.loadingText}>Loading completion data...</div>
		</div>
	)
}
