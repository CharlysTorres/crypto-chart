// import { useState } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

import './styles.css';

export function Main() {
	// const [ chartData, setChartData ] = useState<any[]>([]);

	return (
		<div className="main-container">
			<div className="content">
				<div className="wrapper">
					<div className="chart"></div>

					<div className="infos">
						<div className="info">
							<FaArrowTrendUp className='icon text-green-500' />
							<div>
								<h2>Valor Max.</h2>
								<p className="value-max">1000</p>
							</div>
						</div>

						<div className="info">
							<FaArrowTrendDown className='icon text-red-500' />
							<div>
								<h2>Valor Min.</h2>
								<p className="value-min">910</p>
							</div>
						</div>

						<div className="info">
							<FaArrowTrendUp className='icon text-green-500' />
							<div>
								<h2>Valor Max.</h2>
								<p className="value-max">1000</p>
							</div>
						</div>

						<div className="info">
							<FaArrowTrendDown className='icon text-red-500' />
							<div>
								<h2>Valor Min.</h2>
								<p className="value-min">910</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
