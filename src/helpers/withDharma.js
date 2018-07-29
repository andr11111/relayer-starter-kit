// External libraries
import React, { Component } from "react";

// Contexts
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

const withDharma = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <DharmaConsumer>
          { (dharmaProps) => {
            return <WrappedComponent  
                dharmaProps={ dharmaProps }
                {...this.props} />;
          } }
        </DharmaConsumer>
      );
    }
  };
}

export default withDharma;