import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {getAllItems} from '../../Actions/itemsActions';
import {CreateItem} from './CreateItem';
 

export class Items extends Component
{
    constructor(props){
        super(props);
       // window.location = "/Home/GetItems";
        this.onItemUpdate = this.onItemUpdate.bind(this);
        this.onItemDelete = this.onItemDelete.bind(this);
        this.getComponent = this.getComponent.bind(this);
        this.state = {
            items: [],
            loading: true,
            failed: false,
            error: ''
        }
    }
    getComponent(event) {
        return <CreateItem/>;
      }
    componentDidMount(){
         this.populateItemsData();
         //this.props.getAllItems();
    }

    componentDidUpdate(prevProps){
        if(prevProps.items.data != this.props.items.data){
            this.setState({items: this.props.items.data});
        }
    }
    onItemUpdate(id)
    {
        const {history} = this.props;
        history.push('/update/'+id);
    }

    onItemDelete(id)
    {
        const {history} = this.props;
        history.push('/delete/'+id);
    }
    populateItemsData(){
       Axios.get("api/Items/GetItems").then(result => {
           const response = result.data;
           this.setState({items: response, loading: false, failed: false, error: ""});

       }).catch(error => {
           this.setState({items: [], loading: false, failed: true, error: "Error loading Items"});
       })
    }


    renderAllItemsTable(items){
        return(
          <div>
            <table  className="equal-width">
                {/* <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Action</th>

                    </tr>
                </thead> */}

                <tbody>
                    {
                        items.map(item =>  (
                            <div>
                               {item.itemId > 1000 ? (
                                    <tr key={item.itemId} >
                                        <td>
                                            {item.itemCategory}
                                        </td>
                                        <td>
                                            ${item.itemValue}
                                        </td>
                                    </tr>   
                                   ) : (
                                    <tr key={item.itemId}>
                                        <td>{item.itemName}</td>
                                        <td>${item.itemValue}</td>
                                        <td> 
                                         <div className="form-group">                                    
                                             <button onClick={() => this.onItemDelete(item.itemId)}class="btn"><i class="fa fa-trash"></i></button> 
                                                 {/* Delete */}
                                            
                                            {/* <button class="btn"><i class="fa fa-trash"></i> Trash</button> */}
                                          </div>
                                        </td>    
                                    </tr>
                                   )
                               }
                               
                               </div>
                                
                            
                         ))
                    }
                    


                </tbody>

            </table>
            <div>
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
            </div>
            </div>  
            

        );
    }
    
    render(){
         
         let content = this.state.loading ? ( 
            <p>
                <em>Loading...</em>
            </p>
        ) : ( this.state.failed ? (
            <div className="text-danger">
                <em> {this.state.error}</em>

            </div>   
        ) : (
            this.renderAllItemsTable(this.state.items))
        )
            
        //  let content = this.props.items.loading ?
        //  (
        //      <p>
        //          <em> Loading...</em>
        //      </p>
        //  ) : (
        //      this.state.items.length && this.renderAllItemsTable(this.state.items)
        //  );

        return(
            <div>
                <h1>Inventory Valuation</h1>
                {content}
               
            </div>

        );
    }
}

const mapStateToProps = ({items}) => ({
    items
});

export default connect(mapStateToProps, {getAllItems})(Items);
