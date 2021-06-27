import React from "react";
import _ from "lodash";
import MoleculeStructure from "../components/MoleculeStructure/MoleculeStructure";

class ExampleDrawingOptions extends React.Component {
  static initialState = {
    computing: false,
    mainStructureInput: "CN1C=NC2=C1C(=O)N(C(=O)N2C)",
    subStructureInput: "[N,n,O;!H0]",
    width: 350,
    height: 250,
  };

  state = { ...ExampleDrawingOptions.initialState };

  render() {
    return (
      <div id="component-example-drawing-options" className="container">
        <section className="hero">
          <div className="hero-body">
            <p className="title">Additional Drawing Options</p>
            <p className="subtitle">
              RDKit.js provides you with all these additional options.
            </p>
          </div>
        </section>
        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <label className="label">Main Structure</label>
              <div className="control">
                <input
                  className="input"
                  defaultValue={this.state.mainStructureInput}
                  onChange={(e) =>
                    this.handleStateChange(e, "mainStructureInput")
                  }
                  placeholder="Enter a SMILES string here..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <label className="label">Substructure</label>
              <div className="control">
                <input
                  className="input"
                  defaultValue={this.state.subStructureInput}
                  onChange={(e) =>
                    this.handleStateChange(e, "subStructureInput")
                  }
                  placeholder="Enter a SMILES or SMARTS string here..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns" style={{ margin: "12px 0" }}>
          <div className="column">
            <div className="field">
              <label className="label">Width</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  defaultValue={this.state.width}
                  onChange={(e) => this.handleStateChange(e, "width")}
                  placeholder="Width"
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Height</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  defaultValue={this.state.width}
                  onChange={(e) => this.handleStateChange(e, "height")}
                  placeholder="Height"
                />
              </div>
            </div>
          </div>
        </div>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    const width = this.state.width || 250;
    const height = this.state.width || 250;
    if (this.state.computing) {
      return (
        <div className="columns">
          <div className="column">
            <span
              style={{ width: width, height: height }}
              key="computing-input-icon"
              className="icon is-small is-left"
            >
              <i className="fas fa-circle-notch fa-spin" />
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="columns">
        <div className="column" style={{ margin: "12px 12px" }}>
          <div
            style={{
              width: width + 12,
              height: height + 12,
              border: "1px solid rgba(0,0,0,.1)",
              borderRadius: "2px",
            }}
          >
            <MoleculeStructure
              id="structure-example-drawing-options-caffeine"
              structure={this.state.mainStructureInput}
              subStructure={this.state.subStructureInput}
              width={width}
              height={height}
              svgMode
            />
          </div>
        </div>
      </div>
    );
  }

  renderInputIcon() {
    if (this.state.computing) {
      return (
        <span key="computing-input-icon" className="icon is-small is-left">
          <i className="fas fa-circle-notch fa-spin" />
        </span>
      );
    } else {
      return (
        <span key="search-input-icon" className="icon is-small is-left">
          <i className="fas fa-search" />
        </span>
      );
    }
  }

  handleStateChange = _.debounce((e, stateProp) => {
    this.setState({ computing: true });

    setTimeout(() => {
      const value =
        e.target.type === "number"
          ? parseFloat(e.target.value, 10)
          : e.target.value;

      this.setState({ [stateProp]: value });
      this.setState({ computing: false });
    }, 100);
  }, 300);
}

export default ExampleDrawingOptions;
