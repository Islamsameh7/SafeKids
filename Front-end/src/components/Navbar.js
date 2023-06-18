import React, { Component  } from 'react';
import Background from './Background';



export default class Navbar extends Component {
  render() {
    const left = {
      role: "menu",
      badge: {
        value: 4,
        bgColor: "transparent",
        theme:"dark",
        textColor: "black",
      },
    };

    return (
      <Background>
       
          <Navbar left={left} title={"Title"} />
       
      </Background>
    );
  }
}
