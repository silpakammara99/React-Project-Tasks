import axios from "axios";
import { Component } from "react";

class PresentCards extends Component {
  state = {
    dishes: [],
    error: false,
    selectdish: null, 
  };

  componentDidMount = () => {
    this.Fetchdata();
  };

  Fetchdata = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/recipes");
      console.log(response.data.recipes);
      this.setState({
        dishes: response.data.recipes,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        error: true,
      });
    }
  };

  selectDish = (dish) => {
    this.setState({ selectdish: dish });
  };

  render() {
    const { dishes, error, selectdish } = this.state;
    
    if (error) {
      return <h1>Failed to load the content</h1>;
    }
    const containerStyle = {
        display: "flex",
        justifyContent: "space-between",
        width: "100vw",
        height: "100vh", 
        overflow: "hidden",
      };
  
  

    const dishListStyle = {
        border: "1px solid black",
        width: "40vw",
        height: "100%", 
        overflowY: "auto", 
      };
  
      const dishStyle = {
        border: "1px solid black",
        width: "20vw",
        height: "40vh",
        margin: "10px",
        cursor: "pointer",
      };
  
      const sidePanelStyle = {
        width: "45vw",
        height: "80%", 
        border: "1px solid black",
        marginRight: "20px",
        overflow: "hidden", 
        padding: "10px",
      };
      return (
      <div style={containerStyle}>

        <div style={dishListStyle}>
          {dishes.length > 0 ? (
            dishes.map((each) => (
              <div key={each.id} style={dishStyle} onClick={() => this.selectDish(each)} >
                <div>
                  <h1>{each.name}</h1>
                  <img src={each.image} height={"160px"}width={"160px"} style={{ margin: "10px" }} alt={each.name} />
                </div>
              </div>
            ))
          ) : (
            <h1>Loading.....</h1>
          )}
        </div>

        {selectdish && (
          <div style={sidePanelStyle}>
            <h2>{selectdish.name}</h2>
            <img
              src={selectdish.image}
              height={"80%"}
              width={"80%"}
              alt={selectdish.name}
            />
            <p> Country CUISINE : { selectdish.cuisine}</p>
          </div>
        )}
      </div>
    );
  }
}

export default PresentCards;
