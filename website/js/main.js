document.addEventListener('DOMContentLoaded',(event) => {
    event.preventDefault();
    const formIncome = document.getElementById('income-form');
      function handleClickEvent(event) {
          event.preventDefault();
          let addIncomeDate = document.getElementById("dateIncome").value;
          let addTransaction = document.getElementById('type').value;
          let addIncomeAmount = document.getElementById('amountIncome').value;
          let descr = document.getElementById('desc').value;
          const formData = {
              date:addIncomeDate,
              transaction: addTransaction,
              description: descr,
              amount:addIncomeAmount,
          };
          let config = {
              method: "POST",
              headers: {
                  "Content-Type":"application/json"
              },
              body:JSON.stringify(formData)
          };
          fetch('https://db-server-project.vercel.app/transactions',config)
          .then(resp => resp.json())
          .then(data => console.log(data))
          .catch(error => {
              let p = document.createElement('');
              p.textContent= error;
          });
      
      }
      if (formIncome) {
        formIncome.addEventListener('submit', handleClickEvent);
        formIncome.reset();
      }
      function fetchTransactions(){
          fetch('https://db-server-project.vercel.app/transactions')// fetch request
          .then(resp => resp.json())
          .then(data=>transactions(data));
      }
      fetchTransactions();
      

      function transactions(data) {
        let appendIncome = document.getElementById('transaction-data');
        data.forEach(i => {
            let row = document.createElement("tr");
    
            let dateCell = document.createElement("td");
            dateCell.textContent = i.date;
            row.appendChild(dateCell);
    
            let typeCell = document.createElement("td");
            typeCell.textContent = i.transaction;
            row.appendChild(typeCell);
    
            let descriptionCell = document.createElement("td");
            descriptionCell.textContent = i.description;
            row.appendChild(descriptionCell);
    
            let amountCell = document.createElement("td");
            amountCell.textContent = `Rs ${i.amount}`;
            row.appendChild(amountCell);
    
            let deleteCell = document.createElement("td");
            let deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete Record";
            deleteButton.className = "delBTN";
            deleteButton.style.backgroundColor = "#4CAF50";
            deleteButton.addEventListener('click', () => {
                deleteEvent(i.id);
            });
            deleteCell.className = "no-border";
            row.appendChild(deleteCell).appendChild(deleteButton);
    
            appendIncome.appendChild(row);
        });
    
        function deleteEvent(id) {
            fetch(`https://db-server-project.vercel.app/transactions/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(resp => resp.json())
                .then((transaction) => alert('deleted'));
        }
    }

   
      
      
      let inc = document.getElementById('income')
      fetch('https://db-server-project.vercel.app/transactions')
      .then(response => response.json())
      .then(data => {
      let incomeSum = 0;
      data.map(transaction => {
        if (transaction.transaction === 'INCOME') {
          let number = parseInt(transaction.amount);
          incomeSum += number;
          console.log(incomeSum);
        }
      });
      const incomeSumElement = document.createElement('div');
      incomeSumElement.textContent = `Total income: Rs ${incomeSum}`;
      if(inc){
        inc.appendChild(incomeSumElement);
      }
      
      let expe = document.getElementById('expense')
      fetch('https://db-server-project.vercel.app/transactions')
      .then(response => response.json())
      .then(data => {
      let expenseSum = 0;
      data.map(transaction => {
        if (transaction.transaction === 'EXPENSE') {
          let number = parseInt(transaction.amount);
          expenseSum += number;
          console.log(expenseSum);
        }
      });
      const expenseSumElement = document.createElement('div');
      expenseSumElement.textContent = `Total Expenses: Rs ${expenseSum}`;
      if(expe){
        expe.appendChild(expenseSumElement);
      }
      
      let bal = document.getElementById('balance');
      const balElement = document.createElement('div');
      let balance = parseInt(incomeSum) - (expenseSum);
      balElement.textContent = `Balance : Rs ${balance}`;
      console.log(balElement);
      if(bal){
        bal.appendChild(balElement);
      }
      //generating a chart
      const ctx = document.getElementById('myChart')
      if(ctx){
        ctx.getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Income', 'Expense'],color:'white',
            datasets: [{
              label: 'Total Amount',
              data: [incomeSum, expenseSum],
              backgroundColor: ["#1C4E80","#EA6A47"
              ],
              borderColor: ['none'
              ],
              borderWidth: 0,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                color:'#333',
                backgroundColor:'white',
              },
              title: {
                display: true,
                text: 'Income vs Expense',color:'#333',
                font: {
                  size: '30pt',
                  weight: 'bold',
                  family: 'Arial, sans-serif',
                }
              },
            },
          },
        });
      }
    });
    });
  })
    
  
  