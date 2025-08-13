import LoginForm from '../features/auth/LoginForm'
import {useNavigate} from 'react-router-dom'
export default function LoginPage(){const nav=useNavigate();return <div className='screen'><LoginForm onSuccess={()=>nav('/home')}/></div>}
