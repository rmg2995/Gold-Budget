import React, {Fragment, useState } from 'react';
import actions from '../../api/index'
import TheContext from '../../TheContext';

const SignUp = (props) => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        console.log(email, password)
        actions.signUp({email, password}).then(user=> {
            console.log(user.data)
            setUser({...user.data})  
        }).catch( response => console.error(response));

    }

    const { history, user, setUser } = React.useContext(TheContext); 

    return (
        <Fragment>
            <h2>SignUP</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" onChange={(e)=>setEmail(e.target.value)} />
                <input name="password" type="password" onChange={(e)=> setPassword(e.target.value)} />
                <input type="submit" value="Sign Up"/>
            </form>
        </Fragment>        
    )
}

export default SignUp;