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
    const dispatch=useDispatch()

    useEffect(()=>{
        
        get()
        // console.log(details)
    },[])

    function get(){

        axios.get("http://localhost:8080/pets")
        .then((res)=>{
            dispatch(petsData(res.data))

            setData(res.data)
            // console.log(data)
        })
    }

    // get()

    return <div>
        <h1>Home</h1>

        <table>
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
                       return  <tr key={elem.id} onClick={()=>{ navigate(`/listing/${elem.id}`)}}>
                            <td>{elem.id}</td>
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


    </div>
}








