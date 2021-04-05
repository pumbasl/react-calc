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

const History = styled.div`
    background-color:green;
    color: white;
    margin-top: 20px;
    padding: 20px;
    height 100%;`;

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

export { Button, Container, History, Wrapper, Input };