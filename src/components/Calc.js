import { Component } from 'react';
import { evaluate } from 'mathjs';
import { Button, Container, History, Wrapper, Input } from './style/style';

export default class Calculator extends Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteElement = this.handleDeleteElement.bind(this);
        this.handleRepeat = this.handleRepeat.bind(this);
        this.noneHandleButton = this.noneHandleButton.bind(this);

        this.state = {
            value: 0,
            state: 'none',
            history: []
        }
    }

    noneHandleButton(event){
        event.preventDefault();
    }

    handleDeleteElement = id => {
        this.setState(prevState => ({
            history: prevState.history.filter(el => el.id !== id)
        }));
    }

    handleRepeat = id => {
        let pizdes = this.state.history.filter(el => el.id === id);
        this.setState(prevState => ({
            history: prevState.history.filter(el => el.id !== id),
            value: pizdes[0].value,
            state: 'none'
        }));
    }

    handleClick(event){
        event.preventDefault();
        if(this.state.value === 0){
            this.setState({value: event.target.value});
        } else {
            if(this.state.state === 'sum'){
                this.setState({value: event.target.value, state: 'none'});
            } else {
                this.setState({value: this.state.value + event.target.value});
            }
        }
        if(event.target.value === "CE"){
            if(this.state.value === 0 || this.state.state === 'sum') {
                this.setState({value: 0});
            } else {
                if(this.state.value.length === 1){
                    this.setState({value: 0});
                } else {
                    if(this.state.value.length){
                        this.setState({value: this.state.value.substring(0, this.state.value.length - 1)});
                    } else {
                        this.setState({value: 0});
                    }
                }
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
                this.state.history.push({id: Math.random(), value: evaluate(this.state.value)});
                
            } catch {
                console.log(1);
                this.setState({value: 'Ошибка', state: 'sum'});
            }
        } else {
            console.log(2);
            this.setState({value: 'Ошибка', state: 'sum'});
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

                            <Button style={{opacity: '0'}} onClick={this.noneHandleButton} >,</Button>
                            <Button onClick={this.handleClick} value=".">.</Button>
                            <Button onClick={this.handleSubmit} value="=">=</Button>
                        </Wrapper>
                </Container>

                <Container>
                    <History>
                        Ваша история:
                        <ul>
                            {this.state.history.map(body => (
                                <li key={body.id}>{body.value} <button onClick={() => { this.handleDeleteElement(body.id) }}>X</button> | <button onClick={() => { this.handleRepeat(body.id) }}>=&gt;</button></li>
                            ))}
                        </ul>
                    </History>
                </Container>
            </form>
        )
    }
}