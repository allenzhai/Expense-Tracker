import React from "react";
import styled from 'styled-components';
import Modal from "../components/modal.js"
import Button from "../components/button";
import Input from "../components/input.js";

const SetBudgetModal = props => {
    const [budget, setBudget] = React.useState(0);

    const finailizeBudget = React.useCallback(() => {
        if (!budget || budget < 0) {
            alert("Please enter a valid budget ammount");
            return;
        }

        props.setBudget(budget)
        props.closeModal();
    }, [budget]);

    return (
        <Modal
            isOpen={props.isOpen}
            appElement={props.appElement}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">
                        {props.title ?? ""}
                    </h2>
                </div>
                <div className="modal-body"  style={{display: "flex", justifyContent: "space-between"}}>
                    <Input onBlur={(e) => setBudget(Number(e.target.value))} placeholder="Budget"></Input>
                    <div>
                        <Button className="button" onClick={finailizeBudget}>Set</Button>
                        <Button className="button" onClick={props.closeModal}>Cancel</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const StyledSetBudgetModal = styled(SetBudgetModal)`
.button {
  background-color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  color: #3c4043;
  cursor: pointer;
  font-family: arial,sans-serif;
  font-size: 14px;
  height: 36px;
  line-height: 27px;
  min-width: 54px;
  padding: 0 16px;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: pre;
}

.button:hover {
  border-color: #dadce0;
  box-shadow: rgba(0, 0, 0, .1) 0 1px 1px;
  color: #202124;
}

.button:focus {
  border-color: #4285f4;
  outline: none;
}

`;

export default StyledSetBudgetModal;