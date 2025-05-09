import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

  const {allCoins, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');
  const [visibleCoins, setVisibleCoins] = useState(10);

  const inputHandler = (e) =>{
    setInput(e.target.value);
    if(e.target.value === ""){
        setDisplayCoin(allCoins);
    }
  }

  const searchHandler = async (e) =>{
    e.preventDefault();
    const coins = await allCoins.filter((item)=>{
        return item.name.toLowerCase().includes(input.toLowerCase())
    });
    setDisplayCoin(coins);
    setVisibleCoins(10);
  }

  const loadMoreCoins = () =>{
    setVisibleCoins(visibleCoins + 10);
  }

  useEffect(()=>{
    setDisplayCoin(allCoins);
  },[allCoins]);

  return (
    <div className='home'>
        <div className="hero">
            <h1>Largest <br/> Crypto Marketplace</h1>
            <p>Track real-time cryptocurrency prices, explore market trends, and stay informed with our comprehensive crypto data platform.</p>
            <form onSubmit={searchHandler}>
                <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto...' required/>
                <datalist id='coinlist'>
                    {
                        allCoins.map((item,index)=>(
                            <option key={index} value={item.name}/>
                        ))
                    }
                </datalist>
                <button type='submit'>Search</button>
            </form>
        </div>

        <div className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign: "center"}}>24H Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {
                displayCoin.slice(0, visibleCoins).map((item, index)=>(
                    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt="" />
                            <p>{item.name + " - " +item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                            {Math.floor(item.price_change_percentage_24h * 100)/100}
                        </p>
                        <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))
            }

            {displayCoin.length > visibleCoins && (
                <div className="load-more-container">
                    <button onClick={loadMoreCoins} className="load-more-btn">
                        Load More
                    </button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Home