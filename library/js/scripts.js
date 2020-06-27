window.onload = () => {
    const btnSelect = document.querySelector('.queryDb');
    const btnInsert = document.querySelector('.insertDb');

    const queryDb = () => {
        fetch('/query')
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
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
            body: JSON.stringify(data) 
          });
        
        return response.json();
    }
    

    btnSelect.addEventListener('click', queryDb);
    btnInsert.addEventListener('click', insertDb);
}