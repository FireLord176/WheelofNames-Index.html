const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

let jokenumber = 0;
var names = [];
var namesreverse = [];
//If 1:Enables overwritten winner.
const prankswitch = 0;

function reverseArr(input) {
    var ret = new Array;
    for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}

function addName(event) {

    if (event.keyCode === 13 || event.type === 'click') {
        var nameInput = document.getElementById('name');
        var name = nameInput.value.trim();

        if (name === "") {
            alert("Please enter a name.");
            return;
        }

        names.push(name);
        nameInput.value = "";

        updateNameList();
        updateRotationValues();
    }
}

function updateNameList() {
    var nameListContainer = document.getElementById("name-list");
    nameListContainer.innerHTML = "";

    for (var i = 0; i < names.length; i++) {

        var listItem = document.createElement("p2");
        listItem.textContent = names[i];
        nameListContainer.appendChild(listItem);


        var lineBreak = document.createElement("br");
        nameListContainer.appendChild(lineBreak);

    }

    // Update chart data and labels
    if (myChart) {
        myChart.data.labels = names;
        myChart.data.datasets[0].data = Array(names.length).fill(60);
        myChart.update();
    } else {
        createChart();

    }
}

function createChart() {
    //Create chart

    const initialLabels = [];
    const initialData = Array(names.length).fill(60);

    myChart = new Chart(wheel, {
        //Plugin for displaying text on pie chart
        plugins: [ChartDataLabels],
        //Chart Type Pie
        type: "pie",
        data: {
            //Labels(values which are to be displayed on chart)
            labels: initialLabels,
            //Settings for dataset/pie
            datasets: [
                {
                    backgroundColor: pieColors,
                    data: initialData,
                },
            ],
        },
        options: {
            //Responsive chart
            responsive: true,
            animation: { duration: 0 },
            plugins: {
                //hide tooltip and legend
                tooltip: false,
                legend: {
                    display: false,
                },
                //display labels inside pie chart
                datalabels: {
                    color: "#ffffff",
                    formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                    font: { size: 16 },
                },
            },
        },
    });

}

// Update rotation values based on names array
function updateRotationValues() {

    namesreverse = reverseArr(names);

    rotationValues = namesreverse.map((name, index) => {
        const minDegree = (index * (360 / names.length));
        const maxDegree = ((index + 1) * (360 / names.length));
        return { minDegree, maxDegree, value: name };
    });
}

//Object that stores values of minimum and maximum angle for a value
let rotationValues = [];
console.log(rotationValues)
//Size of each piece
const data = Array(names.length).fill(60);
//background color for each piece
var pieColors = [
    "#449B12",
    "#63DC1E",
    "#449B12",
    "#63DC1E",
    "#449B12",
    "#63DC1E",
];

//display value based on the randomAngle
const valueGenerator = (angleValue) => {
    console.log("hit")
    for (let i of rotationValues) {
        //if the angleValue is between min and max then display it
        console.log(i.value, " i.minDegree: ", i.minDegree, " i.maxDegree: ", i.maxDegree)
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            if (prankswitch === 1) {
                if (jokenumber === 0) {
                    finalValue.innerHTML = `<p>Winner: Lyle!</p><p1>Reason: For Inventing the wheel!</p1>`;
                    jokenumber = 1;
                } else {
                    if (jokenumber === 1) {
                        finalValue.innerHTML = `<p>Winner: Ikhlaas!</p><p1>Reason: For making silly rules about no resampling!</p1>`;
                        jokenumber = 2;
                    } else {
                        if (jokenumber === 2) {
                            finalValue.innerHTML = `<p>Winner: Payal!</p><p1>Reason: For adding Louw's name back to the wheel..</p1>`;
                            jokenumber = 0;
                        }
                    }
                }
            } else {
                finalValue.innerHTML = `<p>Winner: ${i.value}!</p>`;

            }
            spinBtn.disabled = false;
            break;
        }
    }
    // }
};

createChart();

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    //Empty final value
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (360));
    //randomDegree = 301;
    //console.log("randomDegree:");
    //console.log(randomDegree);
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
        //Set rotation for piechart
        /*
        Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
        */

        //console.log("myChart.options.rotation");
        //console.log(myChart.options.rotation);
        myChart.options.rotation = myChart.options.rotation + resultValue;
        //Update chart with new value;
        myChart.update();
        //console.log(myChart.update());

        //If rotation>360 reset it back to 0
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
            //   } else if (count > 15 && myChart.options.rotation == 271) {			
        } else if (count > 15 && myChart.options.rotation == (randomDegree + 90) % 360) {
            valueGenerator(randomDegree);


            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
            //console.log("rotationInterval")
            //console.log(rotationInterval)
        }
    }, 10);
});