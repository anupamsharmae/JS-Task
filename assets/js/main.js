// JSON API from where the data will be fetched
const APPLOAD_URL = 'https://demo1.bookingkoala.co.in/api/v3/appload-new';
var appload = null;
/**
 * ================================ SECTION Creation ================================  
 * */
// function call to create dynamic sections
createSections();

// function that create dynamic sections
function createSections() {
   let sections = ['frequency', 'service_category', 'extra', 'clock', 'color_buttons', 'url_objects', 'tooltip'];
   for (let section of sections) {
      const div = document.createElement('div');
      div.setAttribute('class', 'section-wrap')
      const sectionTitle = document.createElement('h3');
      div.setAttribute('id', section);
      sectionTitle.innerText = section;
      div.appendChild(sectionTitle);
      document.body.appendChild(div);
   }
}
/**
 * ================================ API SECTION ================================  
 * */
// calling function to fetch the data from url
getAppload(APPLOAD_URL);

//fetching data from api
function getAppload(url) {
   //fetch request
   fetch(url).then(response => {
      if (!response.status === 200)
         console.log('Response is not ok');
      else {
         //console.log('response ok!');
         return response.json();
      }
   })
      .then(response => {
         appload = response?.response?.data;
         if (appload) {
            // check whether frequency array is exit & if exit empty or not.
            if (appload.frequencies && appload.frequencies.length > 0) {
               // function that create btn passing array as an arguements.
               createFrequencyBtn(appload.frequencies);
            }
            // check for service categories in api
            if (appload.service_category && appload.service_category.length > 0) {
               // fuction that create service category and passing category array as arguement
               createServiceCategory(appload.service_category);
            }
            //check for extras in api
            if (appload.extras && appload.extras.length > 0) {
               //function that create extras section
               createExtras(appload.extras);
            }
         }
         else
            console.log("object not find!");
      })
      .catch(error => { console.log('error', error) });
}
/**
 * -------------------------------Frequency button section-------------------------------
 * */
//function to create btn
function createFrequencyBtn(frequencies) {
   for (let frequency of frequencies) {
      const frequencyBtn = document.createElement('button');
      frequencyBtn.setAttribute('id', frequency.id);
      frequencyBtn.setAttribute('class', 'btn frequency-btn');
      //click event listener
      frequencyBtn.addEventListener('click', (event) => {
         let frequencyBtns = document.getElementsByClassName('frequency-btn');
         // removing all active toggles 
         for (let btn of frequencyBtns) {
            btn.classList.remove('toggle-btn--active');
         }
         // adding active toggle to current frequency btn
         frequencyBtn.classList.add('toggle-btn--active');
         formData['frequeny_id'] = event.target.id;
      });
      frequencyBtn.innerText = frequency.name;
      document.getElementById('frequency').classList.add('form--bg')
      document.getElementById('frequency').appendChild(frequencyBtn);
   }
}
/**
 * -------------------------------Services category section-------------------------------
**/
// method to create Services category
function createServiceCategory(serviceCategories) {
   //creating elements
   const serviceCategoryForm = document.createElement('form');
   const select = document.createElement('select');
   const disabledOption = document.createElement('option');
   // setting attributes
   serviceCategoryForm.setAttribute('class', 'service-category-form');
   select.setAttribute('id', 'service-category-select');
   select.setAttribute('class', 'form-select form-control');
   // onChange event listener 
   select.addEventListener('change', (event) => {
      formData['service_category_id'] = event.target.value;
   });
   disabledOption.innerText = 'Select Categoies';
   disabledOption.disabled = true;
   disabledOption.defaultSelected = true;
   disabledOption.value = 0;
   select.appendChild(disabledOption);
   // select option for categories
   for (let option of serviceCategories) {
      const selectOption = document.createElement('option');
      selectOption.text = option.name;
      selectOption.value = option.id;
      select.appendChild(selectOption);
   }
   serviceCategoryForm.appendChild(select);
   document.getElementById('service_category').classList.add('form--bg');
   document.getElementById('service_category').appendChild(serviceCategoryForm);
}
/**
 * -------------------------------Extras section-------------------------------
**/
// method to create extras
function createExtras(extras) {
   const extraItemWrap = document.createElement('div');
   extraItemWrap.setAttribute('id', 'extras_wrapper');
   extraItemWrap.setAttribute('class', 'extra-item-wrap dflex');
   let selectedExtras = [];
   // creating items based on extras
   for (let extra of extras) {
      // creating elements
      const checkboxWrap = document.createElement('div');
      const checkbox = document.createElement('input');
      const checkboxLabel = document.createElement('label');
      // setting attributes
      checkboxWrap.setAttribute('class', 'checkbox-wrap');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('class', 'checkbox-control');
      checkbox.setAttribute('name', extra.name);
      checkbox.setAttribute('id', extra.id);
      checkboxLabel.setAttribute('for', extra.id);
      checkboxLabel.innerText = extra.name;
      // onChange listener when checkbox is clicked
      checkbox.addEventListener('change', (event) => {
         if (event.target.checked)
            selectedExtras.push(event.target.id);
         else
            selectedExtras.splice(selectedExtras.indexOf(event.target.id), 1);
         formData['extras'] = selectedExtras;
      });
      checkboxWrap.appendChild(checkbox);
      checkboxWrap.appendChild(checkboxLabel);
      extraItemWrap.appendChild(checkboxWrap);
      document.getElementById('extra').classList.add('form--bg');
      document.getElementById('extra').appendChild(extraItemWrap);
   }
}
/**
 * ================================ FORM SECTION ================================  
 * */
const submitBtn = document.getElementById('submitBtn');
//submit btn click event handler
submitBtn.addEventListener('click', (event) => {
   //prevent from page reload
   event.preventDefault();
   //function call to validate form data
   validateInputFields();
});
//method to validate form data
function validateInputFields() {
   let fullName = document.getElementById('fname');
   let emailId = document.getElementById('email');
   let reviews = document.getElementById('description');
   let helperName = document.getElementById('helperName');
   let helperEmail = document.getElementById('helperEmail');
   let helperReview = document.getElementById('helperReview');
   //check for fullname input
   if (fullName.value !== '') {
      if (!(/^[a-zA-Z\s.]+$/.test(fullName.value))) {
         helperName.innerText = 'Only alphabet are allowed! and (.)';
         fullName.classList.add('input--error');
      }
      else {
         fullName.classList.remove('input--error');
         helperName.innerText = '';
      }
   }
   else {
      helperName.innerText = 'Field is empty!'
   }
   // check for email ID input
   if (emailId.value !== '') {
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId.value))) {
         helperEmail.innerText = 'email is not proper!';
         emailId.classList.add('input--error');
      }
      else {
         emailId.classList.remove('input--error');
         helperEmail.innerText = '';
      }
   }
   else {
      helperEmail.innerText = 'Field is empty!';
   }
   //check for review description
   if (reviews.value !== '') {
      if (!(/^[a-zA-Z\s.!#?]+$/.test(reviews.value))) {
         helperReview.innerText = 'Review is not proper!. Special characters are not allowed!';
         reviews.classList.add('input--error');
      }
      else {
         reviews.classList.remove('input--error');
         helperReview.innerText = '';
      }
   }
   else {
      helperReview.innerText = 'Field is empty!';
   }
}
/**
 * ================================ CLOCK SECTION ================================  
 * */
// method to create Clock
createClock();

function createClock() {
   //create elements
   const clockWrapper = document.createElement('div');
   let currentDate = document.createElement('span');
   let currentTime = document.createElement('span');
   //setting attributes
   currentDate.setAttribute('class', 'current-date');
   currentTime.setAttribute('class', 'current-time');
   // Declaring a date with Date()
   var date = new Date();

   //callback method to display time at every 1 sec
   setInterval(() => {
      date = new Date();
      // declaring AM or PM based on hours
      let dayTime = ((date.getHours() >= 12) ? "PM" : "AM");
      // time methods that will display like 01,02,03,...
      // hours method for 12hr time.
      let hours = () => {
         return ((date.getHours() > 9) ? ((date.getHours() > 12) ? ("0" + (date.getHours() - 12)) : date.getHours()) : "0" + date.getHours());
      }
      // minutes method for displaying minutes like 01,02,03,...
      let minutes = () => {
         return ((date.getMinutes() > 9) ? date.getMinutes() : "0" + date.getMinutes())
      }
      // seconds method for displaying like 01,02,03,...
      let seconds = () => {
         return ((date.getSeconds() > 9) ? date.getSeconds() : "0" + date.getSeconds())
      }
      //display current time.
      currentTime.innerText = hours() + ":" + minutes() + ":" + seconds() + " " + dayTime;
      clockWrapper.appendChild(currentTime);
   }, 1000);
   // display current date.
   let todayDate = () => {
      return ((date.getDate() > 10) ? date.getDate() : ("0" + date.getDate()));
   }
   let dateMonth = () => {
      return ((date.getMonth() > 9) ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1)));
   }
   currentDate.innerText = todayDate() + "/" + dateMonth() + "/" + date.getFullYear();
   clockWrapper.appendChild(currentDate);
   document.getElementById('clock').appendChild(clockWrapper);
}
/**
 * ================================ CHAT-BTN SECTION ================================  
 * */
createChatBtn();

//method for Chat btn.
function createChatBtn() {
   const chatBtn = document.createElement('button');
   chatBtn.setAttribute('class', 'btn chat-btn');
   chatBtn.innerHTML = '<i class="fas fa-comment-alt-lines chat-icon"></i>';
   document.body.appendChild(chatBtn);
}
/**
 * =================== (RED, YELLOW, GREEN, BLUE) buttons btn section =================  
 * */
const colors = ['red', 'yellow', 'green', 'blue'];

createColorBtn();

//method for creating different color btns.
function createColorBtn() {
   if (colors.length > 0) {
      const colorBtnWrapper = document.createElement('div');
      const btnWrapperText = document.createElement('span');
      //setting attributes
      btnWrapperText.setAttribute('id', 'btn_wrapper_text');
      colorBtnWrapper.setAttribute('class', 'color-btn-wrap');
      for (let color of colors) {
         const colorBtn = document.createElement('button');
         colorBtn.setAttribute('id', color);
         colorBtn.setAttribute('class', 'btn color-btn');
         colorBtn.innerText = color;
         // click event listener
         colorBtn.addEventListener('click', (event) => {
            const colorBtns = document.getElementsByClassName('color-btn');
            //reset colors of colorBtn
            for (let btn of colorBtns) {
               btn.classList.remove(`color-btn--${btn.getAttribute('id')}`);
               colorBtnWrapper.classList.remove(`color-btn-wrap--${btn.getAttribute('id')}`);
            }
            // add color and text to current btn
            colorBtn.classList.add(`color-btn--${event.target.id}`);
            colorBtnWrapper.classList.add(`color-btn-wrap--${event.target.id}`);
            btnWrapperText.innerText = `"${event.target.id}" button is selected`;
         });
         colorBtnWrapper.appendChild(colorBtn);
      }
      document.getElementById('color_buttons').appendChild(colorBtnWrapper);
      document.getElementById('color_buttons').appendChild(btnWrapperText);
   }
   else
      console.log("Array is 'null'!")
}
/**
 * =================================== ACCORDIAN SECTION ================================ 
 * */
//accordian btn array
const accordianBtns = document.getElementsByClassName('accordian-btn');

for (let btn of accordianBtns) {
   // click event listener for accordian btns 
   btn.addEventListener('click', (event) => {
      //dynamic selection of accordian body.
      let accordianContent = document.getElementById(`${event.target.id}_content`);
      //check for accordian body is hidden
      if (accordianContent.classList.contains('collapse')) {
         accordianContent.classList.remove('collapse');
         btn.classList.replace('arrow-left', 'arrow-down');
      }
      else {
         accordianContent.classList.add('collapse');
         btn.classList.replace('arrow-down', 'arrow-left');
      }
   });
}
/**
 * =================================== DRAG-DROP SECTION ================================ 
 * */
var source, data, targetElement, cloneElement;
// drag event function
function drag(event) {
   event.dataTransfer.setData('text', event.target.id);
   source = event.target;
}
// check the item to be dropped is before the target item 
function isbefore(scrElement, trgtElement) {
   if (scrElement.parentNode === trgtElement.parentNode)
      for (var currentElement = scrElement; currentElement; currentElement = currentElement.previousSibling) {
         if (currentElement === trgtElement)
            return true;
      }
   return false;
}
//drop event funtion
function drop(event) {
   event.preventDefault();
   const copyContainer = document.getElementById('copy_container');
   data = event.dataTransfer.getData('text', event.target.id);
   targetElement = event.target;

   if (event.target.id === "drop_container" || event.target.id === "drag_list" || event.target.id === "drag_list_2" || event.target.id === "img_container_1") {
      event.target.appendChild(document.getElementById(data));
   }
   // cloning the dragging element and paste into container.
   else if (event.target.id === 'copy_container') {
      cloneElement = source.cloneNode(true);
      // check the copied element not further drag and copied into same container
      if (source.parentNode.id !== 'copy_container') {
         copyContainer.appendChild(cloneElement);
      }
   }
   // reordering the lists when dragging element is dropped.
   else {
      if (isbefore(source, targetElement)) {
         targetElement.parentNode.insertBefore(source, targetElement);
      }
      else {
         targetElement.parentNode.insertBefore(source, targetElement.nextSibling);
      }
   }
}
// Default action when an it item is dropped.
function allowDrop(event) {
   event.preventDefault();
}
/**
 * =================================== FORM DATA API SECTION ================================ 
 * */
// form data object.
var formData = {}
// submit-form-data btn
const formDataBtnWrapper = document.createElement('div');
const submitFormDataBtn = document.createElement('button');
formDataBtnWrapper.setAttribute('class', 'section-wrap form--bg')
submitFormDataBtn.setAttribute('class', 'btn');
submitFormDataBtn.innerText = 'Submit Form Data';
// click event listener
submitFormDataBtn.addEventListener('click', () => {
   console.log(JSON.stringify(formData));
});
formDataBtnWrapper.appendChild(submitFormDataBtn);
document.getElementById('clock').insertAdjacentElement('beforebegin', formDataBtnWrapper);
/**
 * =========================== REMOVE DUPLICATE FROM AN ARRAY ============================== 
 * */
// (8) [2, 22, 85, 21, 4, 9, 1, 3]
var duplicateArray = [2, 22, 85, 21, 22, 4, 9, 4, 1, 2, 22, 21, 4, 9, 1, 3, 1, 4, 22];

// function to remove duplicates from an array
function removeDuplicate(arr) {
   let uniqueArray = [];
   arr.forEach((value) => {
      if (!uniqueArray.includes(value))
         uniqueArray.push(value);
   });
   return uniqueArray;
}

let distinctArray = removeDuplicate(duplicateArray);
// console.log("Distinct array : " + distinctArray);
/**
 * ==================================== SORT AN ARRAY ===================================== 
 * */
// (9) [-4, 1, 2, 3, 3, 5, 6, 7, 8]
var arr1 = [3, 8, 7, 6, 5, -4, 3, 2, 1];

// method to get an sorted array
function getSortedArray(arr) {
   return arr.sort((firstIndex, secondIndex) => firstIndex - secondIndex);
}
arr1 = getSortedArray(arr1);
// console.log("Sorted array : " + arr1)
/**
 * ==================== MERGE TWO ARRAYS & REMOVE DUPLICATE FROM AN ARRAY ================ 
 * */
// merging two arrays. 
var mergedArray = duplicateArray.concat(arr1);
// console.log("Merged array : " + mergedArray);
//removing duplicates elements from an array.
mergedArray = removeDuplicate(mergedArray);
// console.log("Unique array : " + mergedArray);
/**
 * ========================== CONVERT UNIX TIMESTAMP TO TIME ============================= 
 * */
function getTimestampToTime(timeStamp) {
   timeStamp *= 1000;
   return new Date(timeStamp);
}
//converting current time into milli second 
let milliSec = Date.parse(new Date());
// method that convert unix time stamp into time
let time = getTimestampToTime(milliSec / 1000);
console.log(time);
/**
 * ========================= GET NUMBER OF DAYS IN A MONTH ============================== 
 * */
function getDaysInMonth(month, year) {
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
   let mn = (month > 12) ? month - 12 : month;
   return new Date(year, month, 0).getDate() + " Days in the " + months[mn - 1] + " of " + year;
}

console.log(getDaysInMonth(05, 1998));
/**
 * ================================= COMPARE TWO DATES ================================== 
 * */
//method to compare two dates i.e greater than, less than or equals to
function compareDates(date1, date2) {
   let compareDate1 = new Date(date1);
   let compareDate2 = new Date(date2);
   //check for greater than case.
   if (compareDate1 > compareDate2) {
      return `${compareDate1.toLocaleDateString()} is greater than ${compareDate2.toLocaleDateString()}`;
   }
   //check for less than case.
   else if (compareDate2 > compareDate1) {
      return `${compareDate1.toLocaleDateString()} is less than ${compareDate2.toLocaleDateString()}`;
   }
   // check for equals to case.
   else{
      return `${compareDate1.toLocaleDateString()} and ${compareDate2.toLocaleDateString()} are equal`;
   }

}

console.log(compareDates("12/04/2022", "12/07/2022"));
/**
 * ================================== URL INTO OBJECT =========================================== 
 * */
//regex for url query pattern
var urlPattern = /([^?&\s]+)(=[^\s]*)/g;
//object & custom url
var urlObject = {}, urlString = 'http://domain.com?productid=xyz&price=2500&customerid=22&name=urlinfo';
//
const urlWrapper = document.createElement('div');
const urlText = document.createElement('p');
const urlBtn = document.createElement('button');
urlText.innerText = 'Click on "Get Url" button';
urlBtn.setAttribute('class', 'btn');
urlBtn.innerText = 'Get Url';
//
urlBtn.addEventListener('click', () => {
   // to get the current url of the page
   urlString = document.URL;
   urlText.innerText = `URL : ${urlString}`;
   urlString = urlString.toString();
   let urlParameter = urlString.match(urlPattern);
   //  check whether url have a parameter 
   if (urlParameter) {
      urlParameter = urlParameter.join().split('&');
      // traversing the urlParameter array
      urlParameter.forEach((parameter) => {
         /*
            parameter consist of string i.e 'xyz = abc', further split the string
            into array on the bases of '=' to get in key, value pairs i.e ['xyz','abc'] 
          */
         parameter = parameter.split('=');
         /*
            the first index of parameter will be treated as 'key' and second index as 'value'.
            i.e parameter[0] will be considered as key &  parameter[1] will be as value.
            ---->  object[key] = value;
         */
         urlObject[parameter[0]] = parameter[1];
      });
      urlText.innerText = `URL : ${urlString} \n Object : ${JSON.stringify(urlObject)}`;
   }
   else {
      urlText.innerText = `URL : ${urlString} \n Object : ${JSON.stringify(urlObject)} \n ${urlParameter}, 'Cannot get the parameters'`;
      console.log(urlParameter, 'Cannot get the parameters');
   }

});
//
urlWrapper.appendChild(urlText);
urlWrapper.appendChild(urlBtn);
document.getElementById('url_objects').appendChild(urlWrapper);
/**
 * ======================================= DEVICE DETECTION =========================================== 
 * */
const deviceWidth = screen.width;
let device = (deviceWidth < 991) ? 'Mobile' : 'Desktop/laptop';
console.log('Device you are using is ' + device)
/**
 * ============================ TRUNCATE STRING TO SPECIFIED LENGTH =================================== 
 * */
function truncateString(str, maxLength) {
   str = (str.length > maxLength) ? str.slice(0, maxLength) : str;
   return str;
}
console.log("Orignal String : " + urlString, "\nTruncate String: " + truncateString(urlString, 15));
/**
 * ================================== COMBINE TWO OR MORE OBJECTS ===================================== 
 * */
var object1 = {
   productid: "xyz",
   price: "2500",
   customerid: "22",
   name: "urlinfo"
};
var object2 = {
   firstName: 'John',
   lastName: 'Doe',
   age: 25,
};

var mergedObject = { ...object1, ...object2 }
console.log(mergedObject);
/**
 * ======================================= TOOLTIP TITLE ============================================== 
 * */
const tooltipWrapper = document.createElement('div');
const tooltip = document.createElement('span');
const tooltipText = document.createElement('span');
tooltip.setAttribute('class', 'tooltip')
tooltipText.setAttribute('class', 'tooltip-text');
tooltip.title = 'The orange "Pending" tag if there is one will let you know that the job has not yet been charged but it was completed.'
tooltip.innerText = 'hover on me!';
// mouse hover event listener when mouse is on an item
tooltip.addEventListener('mouseover', (event) => {
   tooltipText.innerText = tooltip.title;
   tooltip.appendChild(tooltipText);
   let totalHeight = tooltip.offsetHeight + tooltipText.offsetHeight + event.clientY
   let bottomHeight = window.innerHeight - totalHeight;
   let rightWidth = window.innerWidth - (tooltip.offsetLeft + tooltip.offsetWidth)
   //console.log(event.clientY, tooltipText.offsetHeight, bottomHeight)

   // bottom check 
   if((tooltipText.offsetHeight) > bottomHeight && bottomHeight < 0){
      tooltipText.style.top = `${bottomHeight}px`;
   }
   // right check
   if (tooltipText.offsetWidth > rightWidth){
      tooltipText.style.left = `${-tooltipText.offsetWidth - (rightWidth * 0.5)}px`
   }
   // top check
   if(event.clientY < tooltipText.offsetHeight){
      tooltipText.style.top = `${event.clientY * 0.5}px`;
   }
   //left check
   if(tooltipText.offsetWidth > tooltip.offsetLeft){
      tooltipText.style.left =`${tooltip.offsetWidth}px`;
   }

});
tooltip.addEventListener('mouseleave', () => {
   tooltip.removeChild(tooltipText);
});
tooltipWrapper.appendChild(tooltip);
document.getElementById('tooltip').appendChild(tooltipWrapper);
// document.body.appendChild(document.createElement('section'));
/**
 * ========================= SUBMENU (DROP-DOWN) SECTION ============================== 
 * */
const dropDownMenu = document.getElementById('menu');
// onClick event listener when clicked on the DropDown menu
dropDownMenu.addEventListener('click',(e)=>{
   // to prevent the default behaviour of the achor tag on onclick event
   e.preventDefault();
   //check for the item that has next sibling or not i.e <ul></ul>(submenu)
   if(e.target.nextElementSibling !== null){
      // dynamic selection of submenu
      let currentSubMenu =  document.getElementById(e.target.nextElementSibling.id);
      // method that collapse all the submenus and child submenus. 
      submenuCollapsed(currentSubMenu);
      // show and display the current submenu.
      currentSubMenu.classList.toggle('collapse');
   }
});
/**
 * recursion method that first check the childs of submenu and nested submenu of the childs, 
 * if child exist, than collapse all the submenus 
 */
function submenuCollapsed(submenu)
{
   for(let submenuChild of submenu.children){
      if(submenuChild.classList.contains('menu-item-child')){
        console.log(submenuChild.children.item(1));
        if(!submenuChild.children.item(1).classList.contains('collapse')){
            submenuChild.children.item(1).classList.add('collapse');
            // recursion call to further check if child of child submenu exist.
            submenuCollapsed(submenuChild.children.item(1));
         }
      }
   }
}
/**
 * ========================= DRAWER TOGGLE SECTION ============================== 
 * */
// var position ='';
// const drawerWrap = document.getElementById('drawer_wrap');
// const overlay = document.getElementById('overlay');
// const drawer = document.getElementById('drawer_content');
// drawerWrap.addEventListener('click', (e)=>{
//    if(e.target.id === 'overlay'){
//       drawer.classList.remove(`drawer--${position}`);
//       overlay.classList.add('collapse');
//    }
// });

// function drawerBtn(e){
//    console.log(e.target.innerText)
//    position = e.target.innerText.toLowerCase();
//    overlay.classList.remove('collapse');
//    drawer.classList.add(`drawer--${position}`)
// }