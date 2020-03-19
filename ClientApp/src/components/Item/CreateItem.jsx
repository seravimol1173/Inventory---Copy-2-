import React, {Component} from "react";
import axios from 'axios';
import NumericInput from 'react-numeric-input';

export class CreateItem extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeItemValue = this.onChangeItemValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category: '',
            name: '',            
            itemvalue: 0

        }
    }

    onChangeName(e){
        this.setState({
            name:  e.target.value
        });

    }
    onChangeCategory(e){
        this.setState({
            category: e.target.value            
        });

    }
    onChangeItemValue(e){
        if (e.target.validity.valid) {
            this.setState({ itemvalue: e.target.value }); 
          }
        

    }

    onSubmit(e) {
        e.preventDefault();
        const {history} = this.props;

        let ItemObject = {
            ItemId: Math.floor(Math.random() * 1000),
            ItemCategory: this.state.category,            
            ItemName: this.state.name,            
            ItemValue: this.state.itemvalue
        }

        
         axios.post("api/Items/AddItem", ItemObject).then(result => {
             history.push('/Items');    
         })
    }
    render(){
        return (
                <div className="trip-form" >
                   <h3>Add New Item</h3>
                    <form onSubmit={this.onSubmit}>
                        <div >                            
                            <input 
                                type="text" 
                                className="form-control"                             
                                placeholder="Item Name...."
                                value={this.state.name} 
                                onChange={this.onChangeName}
                            />

                        </div>
                        <div >                            
                            <NumericInput                                 
                                min={0} 
                                max={100000}                              
                                className="form-control" 
                                initValue={this.state.itemvalue}
                                value={this.state.itemvalue}
                                onChange={value => this.setState({itemvalue:value})}
                                step="any"
                            />
                        </div>
                        <div>                            
                            <select className="form-control" 
                                value={this.state.category} 
                                onChange={this.onChangeCategory}>
                                <option value="">Select an Option:</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Misc">Misc</option>
                            </select>
                        </div>
                        
                        
                        <div >
                            <button type="submit" value="Add Item" class="btn">Add</button>
                        </div>
                    </form>
                </div >
           
        )
        }
}

