import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface noteTypes {
   note:{
  title:string,
  content:string,
  color:string,
  id:string
   },
   allData:any[],
   searchData:any[],
   deletingHandler:boolean
}

const initialState: noteTypes = {
    note:{
  title:"",
  content:"",
 color:"",
 id:""
    },
    allData:[],
    searchData:[],
    deletingHandler:false
    
}


export const noteSlice = createSlice({
  name: 'noteSlice',
  initialState,
  reducers: {
    addNotes:(state,action:PayloadAction<any>)=>{
        state.note.title=action.payload?.title
        state.note.content=action.payload?.content
        state.note.color=action.payload?.color
        state.note.id=action.payload.id
        if(state.allData.length>0){
        state.allData=[...state.allData,{title:state.note.title,content:state.note.content,color:state.note.color,id:state.note.id}]
        }else{
            state.allData=[{title:state.note.title,content:state.note.content,color:state.note.color,id:state.note.id}] 
        }
      window.localStorage.setItem("mynotes",JSON.stringify(state.allData))
    },
    getAllData:(state)=>{
        state.allData=JSON.parse(window.localStorage.getItem("mynotes")||"{}")
    },
    deleteData:(state,action:PayloadAction<string>)=>{
      const oldNotes= window.localStorage.getItem("mynotes")
      const parsedNotes=oldNotes&&JSON.parse(oldNotes)
      const filtered=parsedNotes.filter((item:any)=>item.id!==action.payload)
      window.localStorage.setItem("mynotes",JSON.stringify(filtered))
      console.log(filtered)
      state.allData=filtered
      state.searchData=filtered
      state.deletingHandler=true
    },
    searchData:(state,action:PayloadAction<any>)=>{
      const filter=state.allData.filter(item=>item.content.includes(action.payload))
      state.searchData=filter
    },
    deletingHand:(state)=>{
      state.deletingHandler=false
    }
  },
})

// Action creators are generated for each case reducer function
export const {addNotes,getAllData,deleteData,searchData,deletingHand} = noteSlice.actions

export default noteSlice.reducer