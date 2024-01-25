import { useState, useEffect } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp, FaEthereum  } from 'react-icons/fa6';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
// import { LiaCoinsSolid } from 'react-icons/lia';
import { BiBitcoin } from 'react-icons/bi';
import { GiCoins } from 'react-icons/gi';
import Select from 'react-select';

import './styles.css';

export function Main() {
	// const today = new Date();

	const options = [
		{value: 'BTC', label: 'Bitcoin', icon: <BiBitcoin />},
		{value: 'ETH', label: 'Ethereum', icon: <FaEthereum />},
	];

	const [currentTheme, setCurrentTheme] = useState('light');

	useEffect(() => {
		// Verificar o tema do sistema e atualizar o estado
		const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setCurrentTheme(darkModeMediaQuery.matches ? 'dark' : 'light');

		// Adicionar um ouvinte para mudanças no tema do sistema
		const handleChange = (event) => {
			setCurrentTheme(event.matches ? 'dark' : 'light');
		};

		darkModeMediaQuery.addEventListener('change', handleChange);

		// Limpar o ouvinte quando o componente é desmontado
		return () => {
			darkModeMediaQuery.removeEventListener('change', handleChange);
		};
	}, []);

	return (
		<div className="main-container">
			<Select
				options={options}
				className='select'
				classNamePrefix='select'
				theme={(theme) => ({
					...theme,
					borderRadius: 0,
					colors: {
						...theme.colors,
						primary25: 'gray',
						neutral0:  currentTheme === 'light' ? 'black' :'white',
						neutral80:  currentTheme === 'light' ? 'black' :'white',
						primary: currentTheme === 'light' ? 'gray' : 'purple',
					},
				})}
				styles={{

				}}
			/>
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
							<MdOutlineCurrencyExchange className='icon text-blue-500' />
							<div>
								<h2>Valor Min.</h2>
								<p className="value-min">910</p>
							</div>
						</div>

						<div className="info">
							<GiCoins className='icon text-yellow-400' />
							<div>
								<h2>Volume</h2>
								<p className="value-max">512451</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
