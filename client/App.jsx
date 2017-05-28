import React from 'react';

class App extends React.Component {
   render() {
      return (
        <div>
            <Navbar/>
            <Main/>
        </div>
      );
   }
}

// Component one
class Navbar extends React.Component{
    render(){

        var string = "In the name of Truth, the Grail Message";
        var image = "https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-goose.jpg";
        var sideLength = "200px";
        var pics = {
           kitty: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-kitty.jpg',
           Doggy: 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-puppy.jpeg'
       };
    // How to use if statement
       function coinToss(){
           return Math.random()< 0.5? "heads" : "tails";
       }
       if(coinToss() === "heads"){
           var im = (<img src={pics.kitty} height={sideLength} width={sideLength} />);
       }else{
           var im = (<img src={pics.Doggy} height={sideLength} width={sideLength} />);
       }
    //    To List out a value
       var people =["Rowe", "Prevost", "Gare"];
       var peopleLIs = people.map(function(person){
            return <li>{person}</li>
       });
       var list = "list-style-type=none"
        return (
            <div>
                <h1>I AM A BIG DIV</h1><br/>
                <p>In the Light of Truth, the Grail Message</p>
                <p>{Math.PI.toFixed(20)}</p>
                <p>{string}</p>
                <p>{2+3}</p>
                <p><img src={image} height={sideLength} width={sideLength}/></p><br/>
                <p>{im}</p>
                <ul>{peopleLIs}</ul>
            </div>
        );

    }
}

// component Two Main
class Main extends React.Component{
    render(){
        return(
            <p>Yes Sir</p>
        );
    }
}

export default App;
