//get all variable
let title = document.getElementById('title');
let price = document.getElementById('pricee');
let taxes = document.getElementById('taxes');
let Ads   = document.getElementById('Ads') ;
let discount   = document.getElementById('discount');
let total      = document.getElementById('total');
let count      = document.getElementById('Count');
let category   = document.getElementById('Category');
let createBtn  = document.querySelector('.create');
let Searchinput       = document.getElementById('search');
let searchTitlebtn    = document.getElementById('searchTitle');
let searchCategorybtn = document.getElementById('searchCategory');
let deleteAll =  document.getElementById('deleteAll');
let deletAllBtn = document.querySelector('.deleteall');
let allInputs = document.querySelectorAll('input');
let body = document.querySelector('body');
let mood = 'create';
let temp;
// start hide dark-mode
document.querySelector('.dark-mode').addEventListener('click',()=>
{
     document.querySelector('.box-mode').classList.toggle('open')
})

// start toggle light mode
document.querySelector('.box-mode .Light').onclick = function ()
{
  body.style.background = 'rgb(181 181 181)';
    document.querySelector('table').style.color = '#000'
    allInputs.forEach(input => {
      input.style.background = '#fff';
        input.style.color = '#000'
        document.querySelector('.box-mode .dark').style.color = "#b1b1b1"
        document.querySelector('.box-mode .Light').style.color = "#EEE"
        document.querySelector('.box-mode').classList.remove('open')
      });
}

// start toggle dark mode
document.querySelector('.box-mode .dark').onclick = function ()
{
  body.style.background = '#222';
    document.querySelector('table').style.color = '#fff'
    allInputs.forEach(input => {
      input.style.background = '#111';
        input.style.color = '#fdfdfd'
        document.querySelector('.box-mode .Light').style.color = "#b1b1b1"
        document.querySelector('.box-mode .dark').style.color = "#EEE"
        document.querySelector('.box-mode').classList.remove('open')
      });
}
//start function CalcTotal
function getTotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +Ads.value)- +discount.value;
        total.innerText = result;
        total.style.background ='#040';
    }else
    {
        total.innerHTML = '';
        total.style.background ='red';
    }
}

//start function create items
let newarr;
if(localStorage.product!= null)
{
    newarr = JSON.parse(localStorage.product);
}else
{
        newarr = [];
}
function ctreateItem ()
{
    if(title.value != ''&& price.value != ''&& Ads.value!= ''&& taxes.value !=''&& discount.value!='' &&count.value != '' && category.value != '')
    {
        let newpro =
            {
                title:title.value.toLowerCase(),
                price:price.value,
                taxes:taxes.value,
                ads:Ads.value,
                discount:discount.value,
                total:total.innerHTML,
                count:count.value,
                category:category.value.toLowerCase()
            }

          if(mood === 'create')
              {
              if(newpro.count > 1 )
                {
                  for(i = 0 ; i <newpro.count ; i++)
                  {
                    newarr.push(newpro)
                  }

                }else
                  {
                    newarr.push(newpro);
                  }

          }else
            {
                    newarr[temp] = newpro;
            }
    }else
        {

          document.querySelector('.emptyinputs').style.right = "0px"
          setTimeout(()=>{
            document.querySelector('.emptyinputs').style.right = "-27%"
          },2000)

        }

    localStorage.setItem('product',JSON.stringify(newarr));
    total.style.background ='red';
    emptyItems();
    ShowItem();
}

//start function empty items
function emptyItems()
{
  title.value = '';
  price.value = '';
  taxes.value = '';
  Ads.value   = '';
  discount.value = '';
  total.innerHTML    ='';
  count.value    = '';
  category.value ='';
}

//start function ShowItem
function ShowItem()
{
 let table = '';
 for(i = 0;i < newarr.length ;i++)
 {
   table +=
   `<tr>
    <td>${i}</td>
    <td>${newarr[i].title}</td>
    <td>${newarr[i].price}</td>
    <td>${newarr[i].taxes}</td>
    <td>${newarr[i].ads}</td>
    <td>${newarr[i].discount}</td>
    <td>${newarr[i].total}</td>
    <td>${newarr[i].category}</td>
    <td>${newarr[i].count}</td>
    <td><button onclick ="updateItem (${i})">Update </button></td>
    <td><button onclick = "deletItem(${i})">Delete</button></td>
    </tr>
   `
 }
   document.getElementById('tableBody').innerHTML =table;
   if(newarr.length > 1 )
   {
       deletAllBtn.innerHTML = `<button onclick = "deletAll ()">deletAll (${newarr.length}) </button>`;

   }else
   {
       deletAllBtn.innerHTML='';
   }
}

//start function delete Item
function deletItem(i)
{
  newarr.splice(i,1);
  localStorage.product = JSON.stringify(newarr);
  ShowItem()
}

//start function delete All
function deletAll ()
{
 newarr.splice(0);
 localStorage.clear()
  ShowItem();

}

// start function updateItem
function updateItem (i)
{
  title.value = newarr[i].title;
  price.value = newarr[i].price;
  taxes.value = newarr[i].taxes;
  Ads.value = newarr[i].ads;
  discount.value = newarr[i].discount;
  getTotal();
  count.value = newarr[i].count;
  category.value = newarr[i].category;
  createBtn.innerHTML = 'Update '
  mood = 'update' ;
  temp = i;
}

//start function check input num or not
function restrictAlphabets(e) {
  var x = e.which || e.keycode;
  if ((x >= 48 && x <= 57))
      return true;
  else
      return false;

}
//select search mode
function selectSearch (id)
{
  if(id==='searchTitle')
  {
   Searchinput.placeholder = 'searchTitle'
  }else
  {
    Searchinput.placeholder = 'searchCategory'
  }
}
// start search by title function
function search(value)
{
  if(Searchinput.placeholder == 'searchTitle')
   {
     let table;
      for(i = 0; i<newarr.length ;i++)
      {
          if(newarr[i].title.includes(value.toLowerCase()))
          {
            table +=
            `<tr>
             <td>${i}</td>
             <td>${newarr[i].title}</td>
             <td>${newarr[i].price}</td>
             <td>${newarr[i].taxes}</td>
             <td>${newarr[i].ads}</td>
             <td>${newarr[i].discount}</td>
             <td>${newarr[i].total}</td>
             <td>${newarr[i].category}</td>
             <td>${newarr[i].count}</td>
             <td><button onclick ="updateItem (${i})">Update </button></td>
             <td><button onclick = "deletItem(${i})">Delete</button></td>
             </tr>
            `
          }else
          {
            document.getElementById('tableBody').innerHTML = 'Not Found';
          }
          document.getElementById('tableBody').innerHTML = table;
      }
  }else
    {
       let table;
        for(i = 0; i<newarr.length ;i++)
        {
            if(newarr[i].category.includes(value.toLowerCase()))
            {
              table +=
              `<tr>
               <td>${i}</td>
               <td>${newarr[i].title}</td>
               <td>${newarr[i].price}</td>
               <td>${newarr[i].taxes}</td>
               <td>${newarr[i].ads}</td>
               <td>${newarr[i].discount}</td>
               <td>${newarr[i].total}</td>
               <td>${newarr[i].category}</td>
               <td>${newarr[i].count}</td>
               <td><button onclick ="updateItem (${i})">Update </button></td>
               <td><button onclick = "deletItem(${i})">Delete</button></td>
               </tr>
              `
              Searchinput.placeholder = 'search';
            }else
            {
              document.getElementById('tableBody').innerHTML = 'Not Found';
            }
            document.getElementById('tableBody').innerHTML = table;
      }
   }

}
ShowItem();