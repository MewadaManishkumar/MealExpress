'use client'
import { useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import UserSignUp from "../_components/UserSignUp"
import UserLogin from "../_components/UserLogin"
import Footer from "../_components/Footer"


const UserAuth=(props)=>{
    const [login,setLogin]=useState(true)

    return(
        <div>
            <CustomerHeader />
            <div className="container">
            <h1>{login?'User Login':'User Signup'}</h1>
            {
                login?<UserLogin redirect={props.searchParams} />:<UserSignUp redirect={props.searchParams} />
            }
            <button className="button-link" onClick={()=>setLogin(!login)}>
                {login?'Do not have account? Signup':'Already have account ? login'}
            </button>
    
            </div>
            
            <Footer />
        </div>
    )
}

export default UserAuth