import Button from '../../components/common/Button'
import {useNavigate} from 'react-router-dom'
export default function LandingButtons(){const nav=useNavigate();return(<div className='landing'><div className='ghost-logo'>ZEBRA</div><div className='btn-stack'><Button onClick={()=>nav('/search')} className='big'>ZEBRA</Button><Button onClick={()=>nav('/top')} className='big outline'>전국 TOP 카페</Button></div></div>)}
