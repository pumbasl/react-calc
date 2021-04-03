import { Component } from 'react';
import { evaluate } from 'mathjs';
import styled from 'styled-components';

const Button = styled.button`
    width: 40px;
    height: 40px;
    margin: 1px;
    background-color: orange;
    border: 2px solid rgba(102, 102, 102, 0.3);
    &:hover{
        transition: all .3s ease-out;
        background-color: #B27300;
    }`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;`;

const Wrapper = styled.div`
    width: 180px;
    padding-left: 15px;
    padding-right: 5px;
    padding-bottom: 15px;
    padding-top: 15px;
    background-color: grey;`;

const Input = styled.input`
    width: 160px;
    height: 30px;
    color: grey;
    margin-bottom: 10px;
    border: 2px solid black`;

export default class Calculator extends Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            value: 0,
            state: 'none'
        }
    }

    handleClick(event){
        event.preventDefault();
        this.setState({state: 'sum'});
        if(this.state.value === 0){
            this.setState({value: event.target.value});
        } else {
            this.setState({value: this.state.value + event.target.value});
        }
        if(event.target.value === "CE"){
            if(this.state.state === "sum"){
                this.setState({value: this.state.value.substring(0, this.state.value.length - 1)});
            }
        }
        if(event.target.value === "C"){
            this.setState({value: 0, state: 'none'});
        }
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        if(parseInt(this.state.value)){
            try {
                this.setState({value: evaluate(this.state.value), state: 'sum'});
            } catch {
                this.setState({value: 'Ошибка', state: 'none'});
            }
        } else {
            this.setState({value: 'Ошибка', state: 'none'});
        }
    }

    render(){
        const Buttons = ["%", "CE", "C", "+", "1", "2", "3", "-", "4", "5", "6", "/", "7", "8", "9", "*", "0"];
        return(
            <form>
                <Container>
                        <Wrapper>
                            <Input type="text" readOnly value={this.state.value} onChange={this.handleChange} />
                            {Buttons.map(( value ) => (
                                <Button onClick={this.handleClick} value={value} key={value}>{value}</Button>
                            ))}

                            <Button style={{opacity: '0'}} >,</Button>
                            <Button onClick={this.handleClick} value=".">.</Button>
                            <Button onClick={this.handleSubmit} value="=">=</Button>
                        </Wrapper>
                </Container>
            </form>
        )
    }
}