import React, {Component} from "react";
import axios from 'axios';

export class UpdateItem extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeItemValue = this.onChangeItemValue.bind(this);
        this.onUpdateCancel = this.onUpdateCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            ItemCategory: '',
            ItemName: '',            
            ItemValue: 0

        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        
        axios.get("api/Items/SingleItem/"+id).then(item => {
            const response = item.data;

            this.setState({
                ItemCategory: response.ItemCategory,
                ItemName: response.ItemName,
                ItemValue: response.ItemValue
            })
        })
    }

    onChangeName(e){
        this.setState({
            ItemName:  e.target.value
        });

    }
    onChangeCategory(e){
        this.setState({
            ItemCategory: e.target.value            
        });

    }
    onChangeItemValue(e){
        this.setState({
            ItemValue:  e.target.value
        });

    }

    onUpdateCancel(){
        const {history } = this.props;
        history.push('/items');
    }

    onSubmit(e) {
        e.preventDefault();
        const {history} = this.props;
        const {ItemId} = this.props.match.params;

        let ItemObject = {            
            ItemCategory: this.state.ItemCategory,
            ItemName: this.state.ItemName,            
            ItemValue: this.state.ItemValue
        }

        axios.put("api/Items/UpdateItem/"+ItemId, ItemObject).then(result => {
            history.push('/items');    
        })
    }
    render(){
        return (
                <div className="trip-form" >
                   <h3>Add New Item</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Item Name:  </label>
                            <input 
                                type="text" 
                                className="form-control"                             
                                value={this.state.ItemName} 
                                onChange={this.onChangeName}
                            />

                        </div>
                        <div className="form-group">
                            <label>Item Name:  </label>
                            <input                            
                                type="text"
                                className="form-control" 
                                value={this.state.ItemValue}
                                onChange={this.onChangeItemValue}
                                step="1"
                            />
                        </div>
                        <div className="form-group">
                            <label>Item Name:  </label>
                            <select className="form-control" 
                                value={this.state.ItemCategory} 
                                onChange={this.onChangeCategory}>
                                <option value="">Select an Option:</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Misc">Misc</option>
                            </select>
                        </div>
                        
                        
                        <div className="form-group">
                            <button  onClick={this.onUpdateCancel} className="btn btn-primary">Cancel</button> 
                            <button  type="submit" className="btn btn-success">Update</button>                                                        
                        </div>
                    </form>
                </div >
           
        )
        }
}

