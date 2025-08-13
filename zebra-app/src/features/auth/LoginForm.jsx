import {useState} from 'react'
import Button from '../../components/common/Button'
import {login} from '../../apis/authApi'
export default function LoginForm({onSuccess}){const[u,setU]=useState('');const[p,setP]=useState('');const submit=async e=>{e.preventDefault();try{const {data}=await login(u,p);if(data?.token)localStorage.setItem('token',data.token);onSuccess&&onSuccess()}catch{alert('로그인 실패')}};return(<form className='login-card' onSubmit={submit}><h2>CAFE</h2><p>로그인하고 카페 서비스를 즐기세요.</p><input placeholder='아이디' value={u} onChange={e=>setU(e.target.value)}/><input type='password' placeholder='비밀번호' value={p} onChange={e=>setP(e.target.value)}/><Button type='submit'>로그인</Button><div className='row small'><a href='#'>비밀번호 찾기</a> · <a href='#'>회원가입</a></div></form>)}
