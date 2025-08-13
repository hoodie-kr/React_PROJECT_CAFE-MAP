export default function Input({icon=false,...rest}){return(<div className='input-wrap'>{icon&&<span className='icon'>🔍</span>}<input {...rest}/></div>)}
