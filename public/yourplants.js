let amount;

fetch('http://localhost:3000/allUserPlants')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        amount = data.length;
        for (let i = 0; i < amount; i++) {
            const box = document.createElement('div');
            box.classList.toggle('box');
            const span = document.createElement('span');
            box.appendChild(span);
            
            span.textContent = "Name: " + data[i].plantName + "\r\n";
            span.textContent += "Location: " + data[i].location + "\r\n";
            span.textContent += "State: " + data[i].state + "\r\n";
            document.body.append(box);
        }
    })
    .catch(function (error) {
        throw error;
    });