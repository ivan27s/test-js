
const url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}';

fetch(url).then(res =>res.json())
    .then(data => renderPage(data))
    .catch(e => console.log(e));

function renderPage(data){
    let tableData = data;
    let sortType;

    function renderTable() {
        const tableBody = document.getElementById('table-body');

        const tableItems = tableData.map(item =>{
            return `<tr id="${item.id}"> 
                  <td>${item.id}</td>
                  <td>${item.firstName}</td>
                  <td>${item.lastName}</td>
                  <td>${item.email}</td>
                  <td>${item.phone}</td>
                </tr>
    `});
        tableBody.onclick = function(event){
            renderUserInfo(event.target.parentNode.id)
        };

        tableBody.innerHTML = tableItems.join(' ')
    }

    renderTable();

    function renderUserInfo(id) {
        const user = tableData.find( el=> {
            return el.id ==id
        });
        const userHTML = `<div>
                    Выбран пользователь <b>${user.firstName} ${user.lastName}</b><br>
                    Описание: <br>
                    <textarea>
                     ${user.description}
                    </textarea><br>
                    Адрес проживания: <b>${user.adress.streetAddress}</b><br>
                    Город: <b>${user.adress.city}</b><br>
                    Провинция/штат: <b>${user.adress.state}</b><br>
                    Индекс: <b>${user.adress.zip}</b>
             </div> `;
        document.getElementById('user-info').innerHTML = userHTML
    }

    document.querySelectorAll('th').forEach(el => {
        el.addEventListener('click' ,()=> {
            if(sortType === 'Ascending'){
                tableData.sort((a,b)=> a.id - b.id).reverse();
                sortType = 'Descending ';
                document.getElementById('type-sort').textContent = 'по убиванию';
                renderTable();
                return ;
            }
            tableData.sort((a,b)=> a.id - b.id);
            sortType = 'Ascending';
            document.getElementById('type-sort').textContent = 'по возростанию';
            renderTable()
        })
    })
}
