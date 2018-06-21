import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import Jumbotron from "./Components/Jumbotron";
import FriendCard from "./Components/FriendCard";
import Footer from "./Components/Footer";
import cats from "./cats.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    cats,
    clickedcat: [],
    score: 0
  };

//when you click on a card ... the fish is taken out of the array
  imageClick = event => {
    const currentcat = event.target.alt;
    const CatAlreadyClicked =
      this.state.clickedcat.indexOf(currentcat) > -1;

//if you click on a fish that has already been selected, the game is reset and cards reordered
    if (CatAlreadyClicked) {
      this.setState({
        cats: this.state.cats.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedcat: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available fish, your score is increased and cards reordered
    } else {
      this.setState(
        {
          cats: this.state.cats.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedcat: this.state.clickedcat.concat(
            currentcat
          ),
          score: this.state.score + 1
        },
//if you get all 12 fish corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              cats: this.state.cats.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedcat: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.cats.map(cats => (
            <FriendCard
              imageClick={this.imageClick}
              id={cats.id}
              key={cats.id}
              image={cats.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
