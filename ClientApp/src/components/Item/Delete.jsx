import React, {Component} from 'react';
import axios from 'axios';

export class DeleteItem extends Component{
    constructor(props){
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onConfirmation = this.onConfirmation(this);

        this.state = {
            itemCategory: "",
            itemName: "",
            itemValue: 0
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

    onCancel(e){
        const history = this.props;
        history.push('/items');

    }

    onConfirmation(e){
        const {id} = this.props.match.params;
        const {history} = this.props;

        axios.delete("api/Items/DeleteItem/" + id).then(result => {
            history.push('/items');
        })
    } 
    render(){
        return(
            <div style={{ marginTop: 10 }}>
        {/* <h2>Delete Item confirmation</h2>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{this.state.itemname} </h4>
            <p class="card-text"> {this.state.itemValue} </p>
            <button onClick={this.onCancel} class="btn btn-default">
              Cancel
            </button>
            <button onClick={this.onConfirmation} class="btn btn-danger">
              Confirm
            </button>
          </div>
        </div> */}
      </div>

        )
    }

}