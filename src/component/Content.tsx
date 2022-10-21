import {  useDispatch } from "react-redux";
import {deleteData} from "../store/slice"
interface Props {
    title:string,
    content:string,
    color:string,
    id:string
}

const Content = ({title,content,color,id}:Props) => {
const dispatch=useDispatch()


    return(
        <div style={{backgroundColor:color,width:"150px",height:"150px",display:"flex"}}>
            <div>
<h3>{title}</h3>
<div>{content}</div>
</div>
<button onClick={()=>dispatch(deleteData(id))} style={{alignSelf:"flex-end"}}>Del</button>

        </div>
    )
}

export default Content