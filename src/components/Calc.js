import { Component } from 'react';
import { evaluate } from 'mathjs';
import styled from 'styled-components';

const Button = styled.button`
    width: 40px;
    height: 40px;
    margin: 1px;
    background-color: #fff;
    border: 2px solid rgba(102, 102, 102, 0.3);
    &:hover{
        transition: all .3s ease-out;
        background-color: #b2d017;
    }`

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;`

const Wrapper = styled.div`
    width: 140px`;

const Inc = styled.div`
    width: 40px;`;

export default class Calculator extends Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            value: 0
        }
    }

    handleClick(event){
        event.preventDefault();
        if(this.state.value === 0){
            this.setState({value: event.target.value});
        } else {
            this.setState({value: this.state.value + event.target.value});
        }
        if(event.target.value === 'CE'){
            this.setState({value: 0});
        }
        if(event.target.value === 'C'){
            this.setState({value: 0});
        }
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        if(parseInt(this.state.value)){
            this.setState({value: Math.trunc(evaluate(this.state.value))});
        } else {
            this.setState({value: 0});
        }
    }

    render(){
        return(
            <form>
                <input type="text" readOnly value={this.state.value} onChange={this.handleChange} />
                <hr />
                <Container>
                    <Wrapper>
                        <Button onClick={this.handleClick} value="%">%</Button>
                        <Button onClick={this.handleClick} value="CE">CE</Button>
                        <Button onClick={this.handleClick} value="C">C</Button>
                        <Button onClick={this.handleClick} value="1">1</Button>
                        <Button onClick={this.handleClick} value="2">2</Button>
                        <Button onClick={this.handleClick} value="3">3</Button>
                        <Button onClick={this.handleClick} value="4">4</Button>
                        <Button onClick={this.handleClick} value="5">5</Button>
                        <Button onClick={this.handleClick} value="6">6</Button>
                        <Button onClick={this.handleClick} value="7">7</Button>
                        <Button onClick={this.handleClick} value="8">8</Button>
                        <Button onClick={this.handleClick} value="9">9</Button>
                        <Button onClick={this.handleClick} value="0">0</Button>
                        <Button onClick={this.handleClick} value=".">.</Button>
                    </Wrapper>
                    <Inc>
                        <Button onClick={this.handleClick} value="+">+</Button>
                        <Button onClick={this.handleClick} value="-">-</Button>
                        <Button onClick={this.handleClick} value="/">/</Button>
                        <Button onClick={this.handleClick} value="*">*</Button>
                        <Button onClick={this.handleSubmit} value="=">=</Button>
                    </Inc>
                </Container>
            </form>
        )
    }
}