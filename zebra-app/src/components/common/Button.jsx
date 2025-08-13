import clsx from 'clsx'
export default function Button({className,children,...rest}){return <button className={clsx('btn',className)} {...rest}>{children}</button>}
