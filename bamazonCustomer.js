var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MySQL123",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});


displayProducts();


function displayProducts() {
    var displayTable = new Table({
        head: ["Item ID", "Catergory", "Product Name", "Price", "Quantity"],
        colWidths: [8, 20, 20, 10, 8]
    });

    connection.query("SELECT * FROM products", function (err, response) {
        if (err) {
            console.log(err);
        }

        for (var i = 0; i < response.length; i++) {
            displayTable.push([
                response[i].id,
                response[i].catergory_name,
                response[i].product_name,
                response[i].price,
                response[i].stock_quantity
            ]);
        }

        console.log(displayTable.toString());
        purchasePrompt();
    });
}

function purchasePrompt() {
    inquirer
        .prompt([
            {
                name: "ID",
                type: "input",
                message: "Please enter Item ID you like to purchase.",
                filter: Number
            },
            {
                name: "Quantity",
                type: "input",
                message: "How many items do you wish to purchase?",
                filter: Number
            }
        ])
        .then(function (answers) {
            purchaseOrder(answers.ID, answers.Quantity);
        });

    function purchaseOrder(ID, purchaseQuantity) {
        connection.query("SELECT * FROM products WHERE id = ?", ID, function (
            err,
            res
        ) {
            if (err) throw err;
            if (purchaseQuantity <= res[0].stock_quantity) {
                var totalCost = res[0].price * purchaseQuantity;
                console.log("Your order is in stock!");
                console.log(
                    "Your total cost for " +
                    purchaseQuantity +
                    " " +
                    res[0].product_name +
                    " is " +
                    totalCost +
                    ". Thank you!"
                );

                var newStock = res[0].stock_quantity - purchaseQuantity;

                connection.query(
                    "UPDATE products SET ? WHERE ? ",
                    [
                        {
                            stock_quantity: newStock
                        },
                        {
                            id: ID
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                    }
                );
            } else {
                console.log(
                    "Insufficient quantity. Sorry, we do not have enough " +
                    res[0].product_name +
                    "to complete your order."
                );
            }
            displayProducts();
        });
    }
}
