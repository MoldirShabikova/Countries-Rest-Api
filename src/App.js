
    import React , {Component} from 'react'
    import './App.css';


    class App extends Component{
      constructor(){
        super()
        this.state ={
          allInfo: [],
          index: 0,
          isLoading: false,
          perPage: 15,
          pages:0,
          page: 0
        }
      }

      componentDidMount() {
        const url = "https://restcountries.com/v3.1/all";

        
      let allRes = fetch(url)
          .then((res) => res.json())
          .then((data) => 
            setTimeout(() => {
              this.setState({ allInfo: data, isLoading: true, });
            }, 500)
          )
          .catch((error) => console.log(error));
          console.log('res', allRes)
      }



    handleNext =()=>{
      const {index, allInfo} = this.state;
      if(index < allInfo.length - 1){
            this.setState({index : index + 1})
      }

    }

    handlePrev =()=>{
      const {index} = this.state;
      if(index > 0){
        this.setState({index : index - 1})
      }
      
    }

    render(){
      const { allInfo, index, isLoading , perPage, page} = this.state
      let items = allInfo.slice(page * perPage, (page + 1) * perPage);
      console.log('render', this.state.allInfo)
      return (
        <div className="App">
          <h2>WORLD COUNTRIES WITH REST API</h2>
          <header>
          <nav>
            <div className='header'>
              <p className='total-count'>{allInfo.length} countries</p>
              <p className='page-count'>Page {index + 1}/{Math.floor(allInfo.length/ perPage)}</p>
            <div className='pagination'>
            <ul className='pagination'>
                <li className='page-item disabled'>
                  <a href='#' className='page-link'><span aria-hidden="true">«</span></a>
                </li>    
                <li onClick={this.handlePrev} > <a href="#" class="page-link" aria-label="Previous"><span aria-hidden="true">‹</span></a></li>
                <li className='page-item'><a href="#" className="page-link">1</a></li>
                <li className='page-item'><a href="#" className="page-link">2</a></li>
                <li className='page-item'><a href="#" className="page-link">3</a></li>
                <li className='page-item'><a href="#" className="page-link">4</a></li>
                <li className='page-item'><a href="#" className="page-link">5</a></li>
                <li onClick={this.handleNext}><a href="#" className="page-link" aria-label="Next"><span aria-hidden="true">›</span></a></li>
                <li><a href="#" className="page-link" aria-label="Last"><span aria-hidden="true">»</span><span className="sr-only">Last</span></a></li>
              </ul>
          </div>
        </div>
            </nav> 
          </header>
      
      
            {items.map((item,index) =>{
              return(
              
                  <div className='countries'> 

                    <div className='country'>
            <img src={item.flags.png}className='container-img'/>
            <div/>
            <h3>{item.name.common}</h3>
            <p>Cap: {item.capital} </p>
            <p>Pop: {item.population}</p>
            </div>
          
                </div>
              )
            })}
          
          <i className="fa fa-spinner fa-spin" style={{ fontSize: "48px" }} ></i>

        </div>
      );

    }
    }

    

    export default App;
