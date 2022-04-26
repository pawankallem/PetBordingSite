import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { useNavigate } from "react-router";
import {petsData} from "../Redux/PetsReducer/action.js"

import "./Home.css"

export const Home=()=>{
    const [data,setData]=useState([])
    const navigate=useNavigate()
    // const details=useSelector((state)=>state.details)
    const [page,setPage]=useState(1);
    // const [size,setSize]=useState(6);
    const [totalpage,setTotalPage]=useState(0)
    const dispatch=useDispatch()

    useEffect(()=>{
        
        get()
        // console.log(details)
    },[])

    function get(){

        axios.get(`https://petbordingsite.herokuapp.com/pets/all?page=${page}&size=2`)
        .then((res)=>{
            // console.log(res.data.totalPages)
            // dispatch(petsData(res.data.entity))
            setTotalPage(res.data.totalPages)
            setData(res.data.entity)
            // console.log(data)
        })
    }
    function handlePageChange(n){
        setPage(page+n)
        get()
    }

    function handleNumbers(e){
        console.log(e.target.value)
        let num=e.target.value
        setPage(+num);
        get()
    }

    // get()

    return <div>
        <h1>Home</h1>

        <table style={{margin:"auto"}}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Capacity</th>
                    <th>Cost per Day</th>
                    <th>Verified</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((elem)=>{
                       return  <tr key={elem._id} onClick={()=>{ navigate(`/listing/${elem._id}`)}}>
                            <td>{elem._id}</td>
                            <td>{elem.name}</td>
                            <td>{elem.city}</td>
                            <td>{elem.address}</td>
                            <td>{elem.capacity}</td>
                            <td>{elem.costPerDay}</td>
                            <td>{elem.verified}</td>
                            <td>{elem.rating}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>

                <div style={{width:"10%",display:"flex",gap:"5px",margin:"auto",marginTop:"50px"}}>
                    {page==1?"":<button onClick={()=>{handlePageChange(-1)}}> Previous </button>}
                    {page+1<=totalpage?<button value={page+1} onClick={handleNumbers}>{page+1}</button> :""}
                    {page+2<=totalpage? <button value={page+2} onClick={handleNumbers}>{page+2}</button> :""}
                    {totalpage==page?"":<button onClick={()=>{handlePageChange(1)}}> Next </button>}
                </div>

    </div>
}








