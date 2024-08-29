

const PrimaryButton = ({title,onClick}:{title:React.ReactNode,onClick:()=>void}) => {
  return (
    <button onClick={onClick} className="p-3 px-5 bg-blue-400 text-black">
         {title}
    </button>
  )
}


export default PrimaryButton