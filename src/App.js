import React from "react";
import axios from 'axios';
import "./index.css";

class App extends React.Component {
    state = {
      data: [],
      per: 3,
      page: 1,
      total_pages: null,
      scrolling:false
    };

  loadUser = () => {
    const { per, page, data } = this.state;
    const url = `https://reqres.in/api/users?per_page=${per}&page=${page}`;
    axios.get(url).then(json =>{
      this.setState({
        data: [...data, ...json.data.data],
        scrolling: false,
        total_pages: json.data.total_pages
      })
      }
    );
  };

  componentDidMount() {
    this.loadUser();
    this.scrollListener = window.addEventListener('scroll',(e)=>{
      this.handleScroll(e);
    })
}

  handleScroll=()=>{
    const { scrolling, total_pages, page } = this.state;
    if(scrolling) return
    if(total_pages <= page) return
    const lastLi = document.querySelector('div.parent > div.child:last-child');
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    var bottomOffset = 20;
    if(pageOffset>lastLiOffset-bottomOffset) this.loadMore() 
  }

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.loadUser
    );
  };

  render() {
    return (
      <div className="App">
        <h1>User</h1>
        <div className='parent'>
          {this.state.data.map(data => (
            <div className='child' key={data.id}>
              <div>
                <div>
                  <img style={{width:"400px"}} src={data.avatar} alt="dp" />
                </div>
                <div>{data.first_name}</div>
                <div>{data.last_name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
