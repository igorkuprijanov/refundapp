import './App.css'
import React, {useEffect} from 'react'
import passwordIcon from './eye.svg'
import settingsIcon from './settingsCog.svg'
import userImage from './userImage.svg'
import Item from './item.js'
import data from './data.js'
import QrReader from 'react-qr-reader'
import Phone from './phoneInput.js'

/*
-polish looks
*/


function ErrorMessage(){
    useEffect(() =>{
        document.getElementById('loginName').style.border = '1px solid red'
        document.getElementById('loginPassword').style.border = '1px solid red'
    })
    
    return(
    <p id='errormessage'>Something went wrong. Check your password and/or login</p>
    )
}

class App extends React.Component{
    
    constructor(){
        super()
        this.state = {
        isLogedIn: false,
        newPassword: false,
        newAccount: false,
        loginError: false,
        settings: false,
        scanner: false,
        refundAmount: false,
        slider: true,
        value: 0,
        setValue: false,
        items: data.map((item => <Item name={item.name} amount={item.amount} key={item.name} sender={item.sender} refundComplete={this.refundComplete}/>)),
        }
        this.login = this.login.bind(this)
        this.createAccount = this.createAccount.bind(this)
        this.newPassword = this.newPassword.bind(this)
        this.loginError = this.loginError.bind(this)
        this.sendNewPassowrd = this.sendNewPassowrd.bind(this)
        this.newAccountSubmition = this.newAccountSubmition.bind(this)
        this.refundComplete = this.refundComplete.bind(this)
        this.userSettings = this.userSettings.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.openScanner = this.openScanner.bind(this)
        this.closeScanner = this.closeScanner.bind(this)
        this.closeRefund = this.closeRefund.bind(this)
        this.howMuchBack = this.howMuchBack.bind(this)
        this.changeForm = this.changeForm.bind(this)
        this.changeAuthencticationMethod = this.changeAuthencticationMethod.bind(this)
        this.showPassword = this.showPassword.bind(this)
        this.hidePassword = this.hidePassword.bind(this)
    }   
        
    login(){
        this.setState({
            isLogedIn: true
        })
    }
    
    createAccount(){
        this.setState({
            newAccount: true
        })
    }
    
    newPassword(){
        this.setState({
            newPassword: true
        })
    }
    
    loginError(){
        this.setState({
            loginError: true
        })
    }
    sendNewPassowrd(){
        alert('Restoration code has been sent to the given e-mail.')
        this.setState({
            newPassword: false
        })
    }
    newAccountSubmition(){
        alert('Your new account has NOT been created and probably never will, come on just skip login')
        this.setState({
            newAccount: false
        })
    }
    userSettings(){
        document.getElementById('userPannel').style.opacity = '0'
        document.getElementById('newItemButton').style.opacity = '0'
        document.getElementById('items').style.opacity = '0'
        document.getElementById('mainPage').style.background = 'none'
        this.setState({
            settings: true
        })
    }
        
    refundComplete(){
        document.getElementById('userNotifications').style.background = '#3560FA'
        document.getElementById('userNotifications').style.color = '#FFFFFF'
        setTimeout(()=>{
            document.getElementById('userNotifications').style.background = '#FFFFFF'
            document.getElementById('userNotifications').style.color = 'black'
        }, 2000)
    }
    saveChanges(){
        document.getElementById('userPannel').style.opacity = '1'
        document.getElementById('newItemButton').style.opacity = '1'
        document.getElementById('items').style.opacity = '1'
        document.getElementById('mainPage').style.background = 'none'
        this.setState({
            settings: false
        })
    }
    handleError = err => {
    console.error(err)
    }
    handleScan = item => {
    if (item) {
        for(let i = 0; i<data.length; i++){
            if(JSON.parse(item).name === data[i].name && JSON.parse(item).sender === data[i].sender){
                alert('Refund for this item has been already issued.')
                return
            }}
            data.push(JSON.parse(item))
            this.setState({
            scanner: false,
            returnAmount: true
            })
        
    }}
    openScanner(){
        this.setState({
            scanner: true
        })
    }
    closeScanner(){
        this.setState({
            scanner: false
        })
    }
    closeRefund(){
        data.pop()
        this.setState({
            returnAmount: false
        })
    }
    howMuchBack(){
        if(parseInt(document.getElementById('returnableProcentage').value) <= 100 && parseInt(document.getElementById('returnableProcentage').value)>0 ){
            data[data.length-1].amount = data[data.length-1].amount * (parseInt(document.getElementById('returnableProcentage').value) * 0.01)
        }
        this.setState({
            returnAmount: false,
            items: data.map((item => <Item name={item.name} amount={item.amount} key={item.name} sender={item.sender} refundComplete={this.refundComplete}/>))
        })
    }
    changeForm(event){
            for(let i =0; i<document.getElementById('settingsClientFormContainer').childElementCount; i++){
                document.getElementById('settingsClientFormContainer').children.item(i).setAttribute('class', 'clientType')
            }
            event.target.setAttribute('class', 'clientSelected clientType')
        }
    changeAuthencticationMethod(){
        if(this.state.slider){
            document.getElementById('switchSlider').setAttribute('class', ' switchSlider switchOffAnimtion')
            document.getElementById('switchButton').style.background='white'
            document.getElementById('offSwitch').style.opacity = '1'
            this.setState({
                slider: false
            })
        }else{
            document.getElementById('switchSlider').setAttribute('class', ' switchSlider switchOnAnimation')
            document.getElementById('switchButton').style.background='#3560FA'
            document.getElementById('offSwitch').style.opacity = '0'
            this.setState({
                slider: true
            })
        }

    }
    showPassword(event){
        event.target.previousElementSibling.type ='text'
    }
    hidePassword(event){
        event.target.previousElementSibling.type ='password'
    }

    render(){
    return (
    <div className="App">
     {this.state.isLogedIn ?
     <div id='mainPage'>
     {this.state.scanner ? 
    <div id='scanner'>
        <p id='cancelScanner' onClick={this.closeScanner}>X</p>
         <QrReader delay={300} onError={this.handleError} onScan={this.handleScan} style={{ width: '100%' }}/>
     </div>
     : null}
     {this.state.returnAmount ?
     <div id='retrunAmount'>
         <h3 id='refundDescription'>Price of this item is {data[data.length-1].amount}€ plus VAT ({parseInt(data[data.length-1].amount)*0.21}€) making it total of {(parseInt(data[data.length-1].amount)*0.21)+parseInt(data[data.length-1].amount)}€. What procentage of the full pirce would you like refunded?</h3>
            <input type='number' id='returnableProcentage' placeholder='Returnable procentage'></input>
            <div id='returnableButtons'>
            <button id='refundableCancel' onClick={this.closeRefund}>Cancel</button>
            <button id='refundableSubmit' onClick={this.howMuchBack}>Submit</button>
           </div>
            <p id='procentageError'>Returnable procentage should be between 1% and 100%</p>
     </div>
    : null}
    {this.state.settings ? 
    <div id='settingsPage'>
       <div id='settingsImage'>
           <img id='settingsUserImage' src={userImage} alt='user avatar'></img>
           <p id='settingsNewImage'>+</p>
       </div>
       <div className='settingsSection'>
       <h3 className='backgroundText'>General:</h3>
       <p>Name</p>
       <input className='newAccountInput' placeholder='Jonathan Doeson' type='text'></input>
       <p>Company</p>
       <input className='newAccountInput' placeholder='Ampher B.V'></input>
       <p>E-mail</p>
       <input className='newAccountInput' placeholder='john.doe@mail.com' type='email'></input>
       <p>Client form</p>
       <div id='settingsClientFormContainer'>
       <button className='clientType' onClick={this.changeForm}>Private</button>
       <button className='clientType' onClick={this.changeForm}>Goverment</button>
       <button className='clientType clientSelected' onClick={this.changeForm}>Business</button>
       </div>
        </div>
        <div className="settingsSection">
            <h3 className='backgroundText'>Finance information:</h3>
            <p>Refund bank account</p>
            <input className='newAccountInput' placeholder='NL5125ING2455578396'></input>
            <p>Billing address</p>
            <input className='newAccountInput' placeholder='Some house 99A, 3013 RP, Townville, Countyland'></input>
        </div>
        <div className="settingsSection">
            <h3 className='backgroundText'>Security:</h3>
            <p>New password</p>
            <input className='newAccountInput' type="password" placeholder='***********'></input><img alt='show or not show the actual password' id='settingsPasswordIcon1' className='icon' src={passwordIcon} onMouseDown={this.showPassword} onMouseUp={this.hidePassword}></img>
            <p>Repeat new password</p>
            <input className='newAccountInput' type="password" placeholder='***********'></input><img alt='show or not show the actual password' id='settingsPasswordIcon2' className='icon' src={passwordIcon} onMouseDown={this.showPassword} onMouseUp={this.hidePassword}></img>
            <p>Two factor authentication</p>
            <div id='switchButton' onClick={this.changeAuthencticationMethod}>
                <div id='onSwitch'>ON</div>
                <div id='switchSlider' className='switchOnAnimation'></div>
                <div id='offSwitch'>OFF</div>
            </div>
            <p>Phone number</p>
            <div id='phoneContainer'>
            <Phone/>
            </div>
        </div>
        <button id='settingsSaveButton' onClick={this.saveChanges}>Save changes</button>
    </div>
    :null}
        <div id='userPannel'>
            <div id="userImage"><img id='userPic' src={userImage} alt='users avatar'></img></div>
            <div id="panelInfo">
                <p id='userName'>Jonathan Doeson</p>
                <p className='backgroundText userText' id='userClientType'>Business client</p>
                <p className='backgroundText userText' id='userOrganisation'>Ampher B.V</p>
                <div id='controls'>
                    <button id='userSettingsButton' onClick={this.userSettings}>SETTINGS <img className='icon' id='settingsbuttonIcon' alt='settings button icon' src={settingsIcon}></img></button>
                    <p id='userNotifications'>!</p>
                </div>
            </div>
        </div>
        <button id='newItemButton' onClick={this.openScanner}>ADD NEW ITEM</button>
        <div id='items'>
        {this.state.items}
        </div>
     </div>
     : this.state.newAccount ? 
    <div id='newAccount'>
        <h1 id='newAccountTitle' className='backgroundText'>New account</h1>
        <p className='newAccountLabel'>Name</p>
        <input className='newAccountInput' placeholder='Jonathan Doeson'></input>
        <p className='newAccountLabel'>E-mail</p>
        <input className='newAccountInput' placeholder='john.doe@mail.com'></input>
        <p className='newAccountLabel'>Password</p>
        <input className='newAccountInput' type="password" placeholder='********'></input><img alt='show or not show the actual password' id='newAccountPasswordIcon1' className='icon' src={passwordIcon} onMouseDown={this.showPassword} onMouseUp={this.hidePassword}></img>
        <p className='newAccountLabel'>Confirm password</p>
        <input className='newAccountInput' type="password" placeholder='********'></input><img alt='show or not show the actual password' id='newAccountPasswordIcon2' className='icon' src={passwordIcon} onMouseDown={this.showPassword} onMouseUp={this.hidePassword}></img>
        <button id='newAccountButton' onClick={this.newAccountSubmition}>Submit</button>
    </div>
     : this.state.newPassword ?
    <div id='restoration'>
       <div>
        <p className='restorationText'>Please enter your valid e-mail address below, a </p>
        <p className='restorationText'style={{borderBottom: "1px solid"}}>validation code </p>
        <p className='restorationText'>will be sent to you after which you will be able to reset a new password.</p>
        </div>
        <input placeholder="john.doe@mail.com"></input>
        <button id='sendNewPasswordButton' onClick={this.sendNewPassowrd}>Submit</button>
    </div>
     :
     <div id='login'>
          <h1 className='backgroundText'>Welcome! Log in or create an account</h1>
          <div className='loginInput'>
          <p className='inputLable'>User name or e-mail</p>
          <input className='loginInput' id='loginName' placeholder='john.doe@mail.com'></input>
          </div>
          <div className='loginInput'>
          <p className='inputLable'>Password</p>
          <input type="password" className='loginInput' id='loginPassword' placeholder='*******'></input><img alt='show or not show the actual password' id='passwordIcon' className='icon' src={passwordIcon} onMouseDown={this.showPassword} onMouseUp={this.hidePassword}></img>
          </div>
          {this.state.loginError ? <ErrorMessage/> : null}
          <button id='loginButton' onClick={this.loginError}>Log in</button>
          <div id='loginMiscContainer'>
          <p className='miscLink' onClick={this.createAccount}>Create new account</p>
          <p className='miscLink' onClick={this.newPassword}>Forgot password?</p>
          <p className='miscLink' onClick={this.login}>Skip login</p>
          </div>
      </div>
     }
    </div>
    );
    }
}

export default App;
