import React, {useEffect} from 'react'


class Item extends React.Component{
    constructor(props){
        super()
        this.state ={
            currentStatus: 'Processing',
            color: "#C4C4C4",
        }
    }
    
    componentDidMount(){
        const timer = setTimeout(() =>{
            this.setState({
                currentStatus: "Working on it",
                color: "#52CFC8"
            })
            setTimeout(()=>{
                if(Math.floor(Math.random() * 10) < 8){  //CHCKS A RANDOM NUMBER IF BLOEW 8 THEN THE REFUND IS DECLINE
                   this.setState({
                        currentStatus: "Refunded",
                        color: "#9BDB5C"
                   },this.props.refundComplete())
                   }else{
                       this.setState({
                            currentStatus: "Denied",
                            color: "#d32c34"
                        },this.props.refundComplete())
                   }
            },5000)
        }, 3000)                            //MILLISECONDS TO SECONDS
        return() => clearTimeout(timer)
    }
    
    render(props){
        
        const barcolor = {
        backgroundColor: this.state.color
        }
        
        return(
        <div id='item' style={barcolor}>
           <div id='itemInfo'>
            <p id='itemName'>{this.props.name}</p>
            <p id='itemCompany'>{this.props.sender}</p>
           </div>
           <div id='itemFinancial'>
            <p id='itemAmount'>{(this.props.amount)*0.85} €</p>
            <p>+</p>
            <p>{(this.props.amount)*0.15} € VAT</p>
           </div>
           <div id='itemStatus'>
               <p>{this.state.currentStatus}</p>
           </div>
        </div>
        )
    }
}

export default Item