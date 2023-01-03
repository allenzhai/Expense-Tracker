import React from "react";
import styled from 'styled-components';
import Button from "../components/button.js";
import Input from "../components/input.js";
import Modal from "../components/modal.js"

const AddExpenseModal = props => {
    const [expense, setExpense] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [cost, setCost] = React.useState(0);

    const addExpense = React.useCallback(() => {
        if (!expense) {
            alert("Please enter a name for the expense");
            return;
        }

        if (!cost || cost < 0) {
            alert("Please enter a valid cost amount");
            return;
        }

        props.addExpense({"expense": expense, "description": description, "cost": cost});
        props.closeModal();
    }, [expense, description, cost]);

    return (
        <Modal
            isOpen={props.isOpen}
            appElement={props.appElement}
        >
            <div className="modal-content">
                <div className="modal-body" style={{display: "flex", justifyContent: "space-between"}}>
                    <Input onBlur={(e) => setExpense(e.target.value)} placeholder="Expense"></Input>
                    <Input onBlur={(e) => setDescription(e.target.value)} placeholder="Description"></Input>
                    <Input onBlur={(e) => setCost(Number(e.target.value))} placeholder="Cost"></Input>
                    <div style={{display: "flex", justifyContent: "end", height: "8vh"}}>
                        <Button className="button" onClick={addExpense}>Add</Button>
                        <Button className="button" onClick={props.closeModal}>Cancel</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AddExpenseModal;