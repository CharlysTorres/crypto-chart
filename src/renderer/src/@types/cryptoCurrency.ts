export interface ICryptoCurrency {
	c?: number, // The close price for the symbol in the given time period.
	h?: number, // The highest price for the symbol in the given time period.
	l?: number, // The lowest price for the symbol in the given time period.
	n?: number, //The number of transactions in the aggregate window.
	o?: number, // The open price for the symbol in the given time period.
	t?: number, // The Unix Msec timestamp for the start of the aggregate window.
	v?: number, // The trading volume of the symbol in the given time period.
	vw?: number, // The volume weighted average price.
}

export interface IRequestCrypto {
  adjusted: boolean,
  queryCount: number,
  request_id: string,
  results: ICryptoCurrency[],
  resultsCount: number,
  status: string,
  ticker: string,
	count: number,
}
