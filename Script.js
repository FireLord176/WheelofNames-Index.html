const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

let jokenumber = 0;
var names = [];

//If 1:Enables overwritten winner.
const prankswitch = 0;

function addName() {
	var nameInput = document.getElementById('name');
	var name = nameInput.value.trim();
	
	
	if (name ==="") {
		alert("Please enter a name.");
		return;
					
	}
	
	names.push(name);
	nameInput.value = "";
		
	updateNameList();	
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
		
}


//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
    { minDegree: 0, maxDegree: 60, value: "Timmy" },
    { minDegree: 60, maxDegree: 120, value: "Johnny" },
    { minDegree: 120, maxDegree: 180 , value: "Chelsea" },
    { minDegree: 180, maxDegree: 240, value: "Jim"},
    { minDegree: 240, maxDegree: 300, value: "Bob" },
    { minDegree: 300, maxDegree: 360, value: "Sarah" },
];

//Size of each piece
const data = [ 60, 60, 60, 60, 60,60];
//background color for each piece
var pieColors = [
    "#449B12",
    "#63DC1E",
    "#449B12",
    "#63DC1E",
    "#449B12",
    "#63DC1E",


];
//Create chart
let myChart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
        //Labels(values which are to be displayed on chart)
        labels: ["Sarah", "Bob", "Jim", "Chelsea", "Johnny", "Timmy"],
        //Settings for dataset/pie
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
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
//display value based on the randomAngle
const valueGenerator = (angleValue) => {

        for (let i of rotationValues) {
            //if the angleValue is between min and max then display it
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
	console.log("randomDegree:");
	console.log(randomDegree);
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
        //Set rotation for piechart
        /*
        Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
        */
		
		console.log("myChart.options.rotation");
		console.log(myChart.options.rotation);		
        myChart.options.rotation = myChart.options.rotation + resultValue;
        //Update chart with new value;
        myChart.update();
		console.log( myChart.update());
        //If rotation>360 reset it back to 0
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
     //   } else if (count > 15 && myChart.options.rotation == 271) {			
        } else if (count > 15 && myChart.options.rotation == (randomDegree + 90)%360) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
			console.log("rotationInterval")
			console.log(rotationInterval)
        }
    }, 10);
});