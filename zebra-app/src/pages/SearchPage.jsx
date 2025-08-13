import {useState} from 'react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import {useNavigate} from 'react-router-dom'
export default function SearchPage(){const nav=useNavigate();const[cafe,setCafe]=useState('');const[area,setArea]=useState('');const go=e=>{e.preventDefault();nav('/map',{state:{cafe,area}})};return(<div className='screen'><h1 className='title'>ZEBRA</h1><p className='sub'>주변 카페를 지도에서 찾아보세요.</p><form className='search-box' onSubmit={go}><Input icon placeholder='원하는 카페' value={cafe} onChange={e=>setCafe(e.target.value)}/><Input icon placeholder='원하는 동네' value={area} onChange={e=>setArea(e.target.value)}/><Button className='full'>검색</Button></form></div>)}
