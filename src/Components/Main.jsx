import { Component } from "react";
import React from "react";
import { FaPlus, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

class Main extends Component {
    state = {
        novaTarefa: '',
        tarefas: [],
        index: -1,
    }

    componentDidMount() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas'))

        if (!tarefas) return

        this.setState({ tarefas })
    }

    componentDidUpdate(prevProps, prevState) {
        const { tarefas } = this.state

        if (tarefas === prevState.tarefas) return

        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    handleCange = (e) => {
        this.setState({
            novaTarefa: e.target.value
        })
    }

    handleEdit = (e, index) => {
        const { tarefas } = this.state

        this.setState({
            index,
            novaTarefa: tarefas[index]
        })
    }

    handleDelete = (e, index) => {
        const { tarefas } = this.state
        const novasTarefas = [...tarefas]

        novasTarefas.splice(index, 1)

        this.setState({
            tarefas: [...novasTarefas]
        })
    }

    handleChecked = (e, tarefas) => {
        const tarefaSelecionada = document.querySelector(`#${tarefas}`)
        tarefaSelecionada.setAttribute("style", 'text-decoration:line-through;color: rgba(69, 21, 49, 0.3)')

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { tarefas, index } = this.state
        let { novaTarefa } = this.state

        novaTarefa = novaTarefa.trim()
        novaTarefa = novaTarefa.toUpperCase()

        if (tarefas.indexOf(novaTarefa) !== -1) return

        const novasTarefas = [...tarefas]

        if (index == -1) {
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: '',
            })
        } else {
            novasTarefas[index] = novaTarefa

            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
                novaTarefa: '',
            })
        }

    }

    render() {
        const { novaTarefa, tarefas } = this.state

        return (
            <div className="main">
                <h1>Lista de Tarefas</h1>
                <form action="#" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Digite A Tarefa Aqui"
                        onChange={this.handleCange}
                        value={novaTarefa}
                    />
                    <button type="submit"><FaPlus /></button>
                </form>
                <ul className="tarefas">
                    {tarefas.map((tarefas, index) => (
                        <li key={tarefas} id={tarefas}>
                            {tarefas}
                            <FaTrash
                                onClick={(e) => this.handleDelete(e, index)}
                                className="delete"
                            />
                            <FaEdit
                                onClick={(e) => this.handleEdit(e, index)}
                                className="edit"
                            />
                            <FaCheck
                                onClick={(e) => this.handleChecked(e, tarefas)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}



export default Main