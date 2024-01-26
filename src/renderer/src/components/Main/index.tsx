import Select from 'react-select';
import { GiCoins } from 'react-icons/gi';
import { BiBitcoin } from 'react-icons/bi';
import { useState, useEffect } from 'react';
// import { LiaCoinsSolid } from 'react-icons/lia';
import { LuSendHorizonal } from 'react-icons/lu';
import { restClient } from '@polygon.io/client-js';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
import { FaArrowTrendDown, FaArrowTrendUp, FaEthereum  } from 'react-icons/fa6';

import { dateToString } from '../../utils';
import { ICryptoCurrency } from '@renderer/@types/cryptoCurrency';

import './styles.css';

interface ISelectOptionCrypto {
	value: string;
	label: string;
	icon: React.ReactNode;
}

export function Main() {
	const now = new Date();
	const [toDate, setToDate] = useState<string>('');
	const [fromDate, setFromDate] = useState<string>('');

	const [selectCrypto, setSelectCrypto] = useState<ISelectOptionCrypto | null>(null);
	const [data, setData] = useState<ICryptoCurrency[] | undefined>(undefined);

	const options = [
		{value: 'BTC', label: 'Bitcoin', icon: <BiBitcoin />},
		{value: 'ETH', label: 'Ethereum', icon: <FaEthereum />},
	];

	const [currentTheme, setCurrentTheme] = useState('light');

	const polygonApi = restClient(import.meta.env.VITE_POLYGON_KEY);

	function handleChartCrypto() {
		if (selectCrypto) {
			polygonApi.crypto.aggregates(`X:${selectCrypto.value}USD`, 1, 'day', fromDate, toDate).then((data) => {
				setData(data.results);
			}).catch(e => {
				console.error('An error happened:', e);
			});
		}
	}

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

	useEffect(() => {
		const getCurrentDate = () => {
			setToDate(dateToString(now));

			// Obtendo a data de 30 dias atrás
			const thirtyDaysAgoDate = new Date(now);
			thirtyDaysAgoDate.setDate(now.getDate() - 30);
			setFromDate(dateToString(thirtyDaysAgoDate));
		};

		getCurrentDate();
	}, []); // O array vazio assegura que o useEffect só é executado uma vez após a montagem do componente

	console.log(data);

	return (
		<div className="main-container">
			<div className="flex">
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
					defaultValue={options[0]}
					onChange={(selected) => setSelectCrypto(selected)}
				/>
				<button className="send" onClick={() => handleChartCrypto()}>
					<LuSendHorizonal size={16} className="text-gray-950 dark:text-slate-50" />
				</button>
			</div>
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
								<h2>Inicio</h2>
								<p className="value-min">914</p>
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
