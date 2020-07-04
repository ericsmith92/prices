window.onload = () => {
    const btnSelect = document.querySelector('.queryDb');
    const root = document.querySelector('.root');

    const form = document.forms[0];

    const queryDb = () => {
        fetch('/query')
            .then(res => res.json())
            .then(json => buildTable(json))
            .catch(err => console.log(err));
    }

    const buildTable = ({ data }) => {
        root.querySelectorAll('*').forEach(n => n.remove());
        const table = document.createElement('table');
        const tableHead = buildTableHead(data[0]);
        const tableBody = buildTableBody(data);


        table.insertAdjacentHTML('afterbegin', tableHead);
        table.insertAdjacentHTML('beforeend', tableBody);
       
        
        root.appendChild(table);
    };

    const buildTableHead = (obj) => {
        const headings = Object.keys(obj);
        const headingsThs = headings.map(heading => `<th>${heading}</th>`);
        
        return ['<tr>', ...headingsThs , '</tr>'].join(''); 
    }

    const buildTableBody = (arr) => {
        const bodyTds = arr.map(row => `<tr><td>${row.name}</td><td>${row.price}</td><td>${row.id}</td></tr>`);
        return bodyTds.join(''); 
    }

    const getStock = (e) => {
        e.preventDefault();

        const inputVal = form.elements['symbol'].value

        if(inputVal.trim()){
            insertDb(inputVal);
        }
    }

    const insertDb = async (data = {}) => {
        const response = await fetch('/insert', {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify({
                symbol: data
            }) 
          });
        
        return response.json();
    }
    
    btnSelect.addEventListener('click', queryDb);
    form.addEventListener('submit', getStock);
}