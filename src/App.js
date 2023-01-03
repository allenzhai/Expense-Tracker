import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import React from "react";
import AddExpenseModal from "./pages/addExpenseModal.js";
import SetBudgetModal from "./pages/setBudgetModal.js";
import { List } from "immutable";
import Button from "./components/button.js";
import Label from "./components/label";

function App() {
	const [expenseForm, toggleExpenseForm] = React.useState(false);
	const [budgetForm, toggleBudgetForm] = React.useState(false);
	const [budget, setBudget] = React.useState(0);
	const [expenses, setExpenses] = React.useState(new List());
	const gridRef = React.useRef();

	const columnDefs = [
		{ field: "expense" },
		{ field: "description" },
		{ field: "cost" }
	];

	const getRowId = React.useMemo(() => {
		return (params) => params.data.id;
	}, []);

  	const gridStyle = React.useMemo(() => ({ height: "80vh", width: "100%", margin: "0px 0px 1vh 0px"}), []);

	const resizeColumns = React.useCallback(() => {
		gridRef.current.api.sizeColumnsToFit();
	}, []);

	const addExpense = React.useCallback((expense) => {
		expense.id = `${expenses.length + 1}`;
		const newExpenses = expenses.push(expense);
		setExpenses(newExpenses);
	}, [expenses]);

	const expensesTotal = React.useMemo(() => {
		return expenses.map(x => x.cost).reduce((prev, next) => prev + next) ?? 0;
	}, [expenses]);

	return (
	<div className="App">
		<div style={{display: "flex", justifyContent: "space-between", height: "8vh", minHeight: "68px"}}>
			<div>
				<Button className="Button" onClick={() => toggleBudgetForm(!budgetForm)}>Set Budget</Button>
			</div>
			<div>
				<Label> Budget: {budget} </Label>
				<Label> Remaining: {budget - expensesTotal} </Label>
			</div>
		</div>
		<div className="ag-theme-alpine" style={gridStyle}>
			<AgGridReact
				ref={gridRef}
				onGridReady={resizeColumns}
				onFirstDataRendered={resizeColumns}
				getRowId={getRowId}
				rowData={expenses}
				columnDefs={columnDefs}
			>
			</AgGridReact>
			<AddExpenseModal
					isOpen={expenseForm}
					addExpense={addExpense}
					appElement={document.getElementsByClassName("ag-theme-alpine")}
					closeModal={() => toggleExpenseForm(false)}
				/>
			<SetBudgetModal
				isOpen={budgetForm}
				setBudget={setBudget}
				appElement={document.getElementsByClassName("ag-theme-alpine")}
				closeModal={() => toggleBudgetForm(false)}
			/>
		</div>
		<div style={{display: "flex", justifyContent: "end", height: "8vh"}}>
			<Button type="Button" onClick={() => toggleExpenseForm(!expenseForm)}>Add Expense</Button>
			<Button type="Button" onClick={() => setExpenses(new List())}>Clear</Button>
		</div>

	</div>
	);
}

export default App;

