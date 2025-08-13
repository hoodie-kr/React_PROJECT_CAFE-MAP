import {useEffect,useState} from 'react'
import RankingTabs from './RankingTabs'
import Button from '../../components/common/Button'
import {fetchRankings} from '../../apis/cafeApi'
import {SAMPLE} from '../../mocks/sampleRankings'
import {useNavigate} from 'react-router-dom'
export default function RankingList(){const nav=useNavigate();const[type,setType]=useState('sales');const[items,setItems]=useState([]);useEffect(()=>{(async()=>{try{const {data}=await fetchRankings(type);setItems(data)}catch{setItems(SAMPLE[type])}})()},[type]);return(<div className='top-wrap'><RankingTabs value={type} onChange={setType}/><h2>TOP 카페</h2><ol className='rank-list'>{items?.slice(0,10).map(it=>(<li key={it.rank}><div className='left'>{it.rank}.</div><div className='mid'>{it.region}</div><div className='right'>{it.name}</div></li>))}</ol><Button onClick={()=>nav('/search')} className='full'>ZEBRA로 지도에서 보기</Button></div>)}
