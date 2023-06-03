// JSON API from where the data will be fetched
const APPLOAD_URL = "https://demo1.bookingkoala.co.in/api/v3/appload-new";
var appload = null;
/**
 * ================================ SECTION Creation ================================  
 * */
// function call to create dynamic sections
createSections();
// function that create dynamic sections
function createSections() {
   let sections = ['frequency', 'service_category', 'extras', 'clock', 'color_buttons', 'url_objects'];
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
// fetching data from api
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
               // function that create btn passing array as an arguments.
               createFrequencyBtn(appload.frequencies);
            }
            // check for service categories in api
            if (appload.service_category && appload.service_category.length > 0) {
               // function that create service category and passing category array as argument
               createServiceCategory(appload.service_category);
            }
            //check for extras in api
            if (appload.extras && appload.extras.length > 0) {
               //function that create extras section
               createExtras(appload.extras);
            }
            // CREATE CLOCK METHOD
            createClock();
            // CREATE CHAT-BTN
            createChatBtn();
            // COLOR-BTN METHOD
            createColorBtn();
            // ACCORDION SECTION
            accordion();
            // FORM-DATA FROM API SECTION
            getFormData();
            // DRAG-DROP SECTION
            //dragDropElement();
            // REMOVE DUPLICATE FROM AN ARRAY
            removeDuplicate();
            // SORT AN ARRAY
            sortArray();
            // MERGE TWO ARRAYS & REMOVE DUPLICATE FROM AN ARRAY
            getMergedArray();
            // CONVERT UNIX TIMESTAMP TO TIME
            getTimeStamp();
            // GET NUMBER OF DAYS IN A MONTH 
            getDays();
            // COMPARE TWO DATES
            compareTwoDates();
            // URL INTO OBJECT
            getUrlObject();
            // DEVICE DETECTION
            getDevice();
            // TRUNCATE STRING TO SPECIFIED LENGTH
            getSpecifiedStringLength();
            // COMBINE TWO OR MORE OBJECTS
            getMergedObject();
            // TOOLTIP TITLE SECTION
            createTooltip();
            // SUBMENU (DROP-DOWN) SECTION
            createDropDownMenu();
            // DRAWER TOGGLE SECTION
            createDrawerToggle();
            // MODAL/POPUP SECTION
            createModal();
            // DRAGULA LIBRARY DRAG-DROP
            dragDrop();
         }
         else {
            console.log("object not find!");
         }
      })
      .catch(error => { console.log(error) });
}
/**
 * -------------------------------Frequency button section-------------------------------
 * */
//function to create btn
function createFrequencyBtn(frequencies) {
   let frequencyBtns = document.getElementsByClassName('frequency-btn');
   for (let frequency of frequencies) {
      const frequencyBtn = document.createElement('button');
      frequencyBtn.setAttribute('id', frequency.id);
      frequencyBtn.setAttribute('class', 'btn frequency-btn');
      //click event listener
      frequencyBtn.addEventListener('click', (event) => {
         // removing all active toggles 
         for (let btn of frequencyBtns) {
            btn.classList.remove('toggle-btn--active');
         }
         // adding active toggle to current frequency btn
         frequencyBtn.classList.add('toggle-btn--active');
         formData['frequency_id'] = event.target.id;
      });
      frequencyBtn.innerText = frequency.name;
      document.getElementById('frequency').appendChild(frequencyBtn);
   }
   document.getElementById('frequency').classList.add('form--bg')
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
   serviceCategoryForm.setAttribute('class', 'form service-category-form');
   select.setAttribute('id', 'service-category-select');
   select.setAttribute('class', 'form-select form-control');
   // onChange event listener 
   select.addEventListener('change', (event) => {
      formData['service_category_id'] = event.target.value;
   });
   disabledOption.innerText = 'Select Categories';
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
         if (event.target.checked) {
            selectedExtras.push(event.target.id);
         }
         else {
            selectedExtras.splice(selectedExtras.indexOf(event.target.id), 1);
         }
         formData['extras'] = selectedExtras;
      });
      checkboxWrap.appendChild(checkbox);
      checkboxWrap.appendChild(checkboxLabel);
      extraItemWrap.appendChild(checkboxWrap);
   }
   document.getElementById('extras').appendChild(extraItemWrap);
   document.getElementById('extras').classList.add('form--bg');
}
/**
 * ================================ FORM SECTION ================================  
 * */
// form submit-btn event listener
document.getElementById('submitBtn').addEventListener('click', formSubmit);
// method to get form-data and validate
function formSubmit(e) {
   //prevent from page reload
   e.preventDefault();
   // method to validate form data
   validateInputFields();
}
//method to validate form data
function validateInputFields() {
   const reviewForm = document.getElementById('review_form');
   //console.log(reviewForm.elements.namedItem('helperName'))
   let helperName = document.getElementById('helperName');
   let helperEmail = document.getElementById('helperEmail');
   let helperReview = document.getElementById('helperReview');
   // fullName input
   if (reviewForm.elements.namedItem('fname').value !== '') {
      if (!(/^[a-zA-Z\s.]+$/.test(reviewForm.elements.namedItem('fname').value))) {
         helperName.innerText = 'Only alphabet are allowed! and (.)';
         reviewForm.elements.namedItem('fname').classList.add('input--error');
      }
      else {
         reviewForm.elements.namedItem('fname').classList.remove('input--error');
         helperName.innerText = '';
      }
   }
   else {
      helperName.innerText = 'Field is empty!'
   }
   // email ID input
   if (reviewForm.elements.namedItem('email').value !== '') {
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(reviewForm.elements.namedItem('email').value))) {
         helperEmail.innerText = 'email is not proper!';
         reviewForm.elements.namedItem('email').classList.add('input--error');
      }
      else {
         reviewForm.elements.namedItem('email').classList.remove('input--error');
         helperEmail.innerText = '';
      }
   }
   else {
      helperEmail.innerText = 'Field is empty!';
   }
   // review description
   if (reviewForm.elements.namedItem('description').value !== '') {
      if (!(/^[a-zA-Z\s.!#?0-9]+$/.test(reviewForm.elements.namedItem('description').value))) {
         helperReview.innerText = 'Review is not proper!. Special characters are not allowed!';
         reviewForm.elements.namedItem('description').classList.add('input--error');
      }
      else {
         reviewForm.elements.namedItem('description').classList.remove('input--error');
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
function createClock() {
   const clockWrapper = document.createElement('div');
   let currentDate = document.createElement('span');
   let currentTime = document.createElement('span');
   //setting attributes
   currentDate.setAttribute('class', 'current-date');
   currentTime.setAttribute('class', 'current-time');
   // Declaring a date with Date()
   let date = new Date();
   /**
    * date and month methods that return in formatted order like 01, 02,.....
    */
   let todayDate = () => ((date.getDate() > 10) ? date.getDate() : ("0" + date.getDate()));
   let todayMonth = () => ((date.getMonth() > 9) ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1)));
   /**
    * time methods that will display like 01,02,03,...
    */
   // hours method for 12hr time.
   let hours = () => ((date.getHours() > 9) ? ((date.getHours() > 12) ? ("0" + (date.getHours() - 12)) : date.getHours()) : ("0" + date.getHours()));
   // minutes method 
   let minutes = () => ((date.getMinutes() > 9) ? date.getMinutes() : ("0" + date.getMinutes()));
   // seconds method 
   let seconds = () => ((date.getSeconds() > 9) ? date.getSeconds() : ("0" + date.getSeconds()));
   /**
    * callback method to display time 
    */
   setInterval(() => {
      date = new Date();
      // declaring AM or PM based on hours
      let dayTime = ((date.getHours() >= 12) ? "PM" : "AM");
      // display current time.
      currentTime.innerText = hours() + ":" + minutes() + ":" + seconds() + " " + dayTime;
      clockWrapper.appendChild(currentTime);
   }, 1000);
   // display current date.
   currentDate.innerText = todayDate() + "/" + todayMonth() + "/" + date.getFullYear();
   // append elements
   clockWrapper.appendChild(currentDate);
   document.getElementById('clock').appendChild(clockWrapper);
}
/**
 * ================================ CHAT-BTN SECTION ================================  
 * */
// method for Chat btn.
function createChatBtn() {
   const chatBtn = document.createElement('button');
   chatBtn.setAttribute('class', 'btn chat-btn');
   chatBtn.innerHTML = '<i class="fas fa-comment-alt-lines chat-icon"></i>';
   document.body.appendChild(chatBtn);
}
/**
 * =================== (RED, YELLOW, GREEN, BLUE) buttons section =================  
 * */
//method for creating different color btns.
function createColorBtn() {
   const colors = ['red', 'yellow', 'green', 'blue'];
   if (colors.length > 0) {
      const colorBtns = document.getElementsByClassName('color-btn');
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
}
/**
 * =================================== ACCORDION SECTION ================================ 
 * */
function accordion() {
   //accordion btn array
   const accordionBtns = document.getElementsByClassName('accordion-btn');
   //
   for (let btn of accordionBtns) {
      // click event listener for accordion btns 
      btn.addEventListener('click', (event) => {
         //dynamic selection of accordion body.
         let accordionContent = document.getElementById(`${event.target.id}_content`);
         //check for accordion body is hidden
         if (accordionContent.classList.contains('collapse')) {
            accordionContent.classList.remove('collapse');
            btn.classList.replace('arrow-left', 'arrow-down');
         }
         else {
            accordionContent.classList.add('collapse');
            btn.classList.replace('arrow-down', 'arrow-left');
         }
      });
   }
}
/**
 * =================================== DRAG-DROP SECTION ================================ 
 * */
var source, data, targetElement, cloneElement;
//
// Default action when an item is dropped.
function allowDrop(event) {
   event.preventDefault();
}
//
// drag event function
function drag(event) {
   event.dataTransfer.setData('text', event.target.id);
   source = event.target;
}
//
// drop event function
function drop(event) {
   event.preventDefault();
   //
   data = event.dataTransfer.getData('text', event.target.id);
   targetElement = event.target;
   //console.log(targetElement.id)
   //
   if (targetElement.id === "drop_container" || targetElement.id === "drag_list" || targetElement.id === "drag_list_2" || targetElement.id === "img_container_1" || targetElement.id === "img_container_2") {
      // dropping item in the container is not present than drop item
      if (!isPresent(document.getElementById(data), targetElement)) {
         targetElement.appendChild(document.getElementById(data));
      }
   }
   // copy & paste the dragging element into container.
   else if (targetElement.id === 'copy_container') {
      cloneElement = source.cloneNode(true);
      // copied element further not dragged and copied into same container
      if (source.parentNode.id !== 'copy_container') {
         targetElement.appendChild(cloneElement);
      }
   }
   // re-ordering the lists when dragging element is dropped.
   else {
      if (source.parentNode.id === targetElement.parentNode.id) {
         if (isBeforeElement(source, targetElement)) {
            console.log('before')
            targetElement.parentNode.insertBefore(source, targetElement);
         }
         else {
            console.log('after')
            targetElement.parentNode.insertBefore(source, targetElement.nextSibling);
         }
      }
   }
}
// item to be dropped is before of that target element. 
function isBeforeElement(srcElement, targetElement) {
   if (srcElement.parentNode === targetElement.parentNode) {
      for (var currentElement = srcElement; currentElement; currentElement = currentElement.previousSibling) {
         if (currentElement === targetElement) {
            return true;
         }
      }
   }
   return false;
}
// item to be dropped is present in the container
function isPresent(srcElement, targetElement) {
   for (let child of targetElement.children) {
      if (child.id === srcElement.id) {
         console.log('present')
         return true;
      }
   }
   return false;
}
/**
 * =================================== FORM DATA FROM API SECTION ================================ 
 * */
// form data object.
var formData = {}
function getFormData() {
   // submit-form-data btn
   const formDataBtnWrapper = document.createElement('div');
   const submitFormDataBtn = document.createElement('button');
   formDataBtnWrapper.setAttribute('class', 'section-wrap form--bg');
   submitFormDataBtn.setAttribute('class', 'btn');
   submitFormDataBtn.innerText = 'Submit Form Data';
   // click event listener
   submitFormDataBtn.addEventListener('click', () => {
      console.log(JSON.stringify(formData));
   });
   formDataBtnWrapper.appendChild(submitFormDataBtn);
   document.getElementById('clock').insertAdjacentElement('beforebegin', formDataBtnWrapper);
}
/**
 * =========================== REMOVE DUPLICATE FROM AN ARRAY ============================== 
 * */
// unique array : (8) = [2, 22, 85, 21, 4, 9, 1, 3]
var duplicateArray = [2, 22, 85, 21, 22, 4, 9, 4, 1, 2, 22, 21, 4, 9, 1, 3, 1, 4, 22];
//
function removeDuplicate() {
   let distinctArray = getUniqueArray(duplicateArray);
   console.log("Distinct array : " + distinctArray);
}
// function to remove duplicates from an array
function getUniqueArray(arr) {
   let uniqueArray = [];
   arr.forEach((value) => {
      if (!uniqueArray.includes(value))
         uniqueArray.push(value);
   });
   return uniqueArray;
}
/**
 * ==================================== SORT AN ARRAY ===================================== 
 * */
// sorted array : (9) = [-4, 1, 2, 3, 3, 5, 6, 7, 8]
var arr1 = [3, 8, 7, 6, 5, -4, 3, 2, 1];
//
function sortArray() {
   arr1 = getSortedArray(arr1);
   console.log("Sorted array : " + arr1)
}
// method to get an sorted array
function getSortedArray(arr) {
   return arr.sort((firstIndex, secondIndex) => firstIndex - secondIndex);
}
/**
 * ==================== MERGE TWO ARRAYS & REMOVE DUPLICATE FROM AN ARRAY ================ 
 * */
function getMergedArray() {
   // merging two arrays. 
   let mergedArray = duplicateArray.concat(arr1);
   console.log("Merged array : " + mergedArray);
   //removing duplicates elements from an array.
   mergedArray = getUniqueArray(mergedArray);
   console.log("Unique array : " + mergedArray);
}
/**
 * ========================== CONVERT UNIX TIMESTAMP TO TIME ============================= 
 * */
// converting unix timestamp into time
function getTimestampToTime(timeStamp) {
   timeStamp *= 1000;
   return new Date(timeStamp);
}
//
function getTimeStamp() {
   //converting current time into millisecond 
   let milliSecond = Date.parse(new Date());
   // method that convert unix time stamp into time
   let time = getTimestampToTime(milliSecond / 1000);
   console.log(time);
}
/**
 * ========================= GET NUMBER OF DAYS IN A MONTH ============================== 
 * */
// return total number of days in a month.
function getDaysInMonth(month, year) {
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
   let monthNumber = (month > 12) ? month - 12 : month;
   return new Date(year, month, 0).getDate() + " Days in the " + months[monthNumber - 1] + " of " + year;
}
//
function getDays() {
   console.log(getDaysInMonth(05, 1998));
}
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
   else {
      return `${compareDate1.toLocaleDateString()} and ${compareDate2.toLocaleDateString()} are equal`;
   }
}
//
function compareTwoDates() {
   console.log(compareDates("12/04/2022", "12/07/2022"));
}
/**
 * ================================== URL INTO OBJECT =========================================== 
 * */
//url object & custom url
var urlString = 'http://domain.com?productid=xyz&price=2500&customerid=22&name=urlinfo';
//
function getUrlObject() {
   let urlObject = {};
   //regex for url query pattern
   let urlPattern = /([^?&\s]+)(=[^\s]*)/g;
   //
   const urlWrapper = document.createElement('div');
   const urlText = document.createElement('p');
   const urlBtn = document.createElement('button');
   urlWrapper.setAttribute('class', 'wrap');
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
               into array on the bases of '=' to get in [key, value] pairs i.e ['xyz','abc'] 
             */
            parameter = parameter.split('=');
            /*
               the first index of parameter will be treated as 'key' and second index as 'value'.
               i.e parameter[0] will be key &  parameter[1] will be value.
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
}
/**
 * ======================================= DEVICE DETECTION =========================================== 
 * */
function getDevice() {
   const deviceWidth = screen.width;
   const device = (deviceWidth < 991) ? 'Mobile' : 'Desktop/laptop';
   console.log('Device you are using is ' + device)
}
/**
 * ============================ TRUNCATE STRING TO SPECIFIED LENGTH =================================== 
 * */
// method that truncate the string upto specified length.
function truncateString(str, maxLength) {
   str = (str.length > maxLength) ? str.slice(0, maxLength) : str;
   return str;
}
//
function getSpecifiedStringLength() {
   console.log("Original String : " + urlString, "\nTruncate String: " + truncateString(urlString, 15));
}
/**
 * ================================== COMBINE TWO OR MORE OBJECTS ===================================== 
 * */
function getMergedObject() {
   let object1 = { productId: "xyz", price: "2500", customerId: "22", name: "urlinfo" };
   let object2 = { firstName: 'John', lastName: 'Doe', age: 25, };
   // merged object 
   let mergedObject = { ...object1, ...object2 }
   console.log("Merged object : ", mergedObject);
}
/**
 * ========================================= TOOLTIP TITLE ============================================== 
 * */
function createTooltip() {
   let tooltipContent = '';
   const tooltipText = document.createElement('div');
   tooltipText.setAttribute('class', 'tooltip-text');
   // tooltips collections  
   const tooltips = document.querySelectorAll('[data-tooltip="tooltip"]');
   // containing array of tooltips
   tooltips.forEach((tooltip) => {
      // mouseover event listener
      tooltip.addEventListener('mouseover', (e) => {
         tooltip.classList.add('tooltip');
         // copy the content of title attribute
         tooltipContent = tooltip.getAttribute('title');
         tooltipText.innerText = tooltipContent;
         //tooltipText.innerText = tooltip.getAttribute('data-title');
         tooltip.removeAttribute('title');
         document.body.appendChild(tooltipText);
         // get the position of tooltip
         let elementPosition = tooltip.getBoundingClientRect();
         let elementTop = Math.floor(elementPosition.top);
         let elementRight = Math.floor(elementPosition.right);
         let elementBottom = Math.floor(elementPosition.bottom);
         let elementLeft = Math.floor(elementPosition.left);
         //console.log(Math.floor(elementPosition.top), Math.floor(elementPosition.right), Math.floor(elementPosition.bottom), Math.floor(elementPosition.left))
         // default position of tooltip
         tooltipText.style.top = `${elementTop - tooltip.offsetHeight}px`;
         tooltipText.style.left = `${elementRight + (tooltip.offsetWidth * 0.2)}px`;
         //
         let bottomScreen = window.innerHeight - elementBottom;
         let rightScreen = window.innerWidth - elementRight;
         // tooltip positions for '[data-position]' attributes
         if (tooltip.getAttribute('data-position')) {
            if (tooltip.getAttribute('data-position') === 'left') {
               tooltipText.style.left = `${elementLeft - (tooltipText.offsetWidth * 1.125)}px`;
               tooltipText.style.top = `${elementTop - (tooltip.offsetHeight * 0.2)}px`;
            }
            else if (tooltip.getAttribute('data-position') === 'top') {
               tooltipText.style.left = `${elementLeft - (tooltip.offsetWidth * 0.5)}px`;
               tooltipText.style.top = `${elementTop - (tooltipText.offsetHeight * 1.125)}px`;
            }
            else if (tooltip.getAttribute('data-position') === 'bottom') {
               tooltipText.style.left = `${elementLeft - (tooltip.offsetWidth * 0.2)}px`;
               tooltipText.style.top = `${elementBottom + (tooltip.offsetHeight * 0.2)}px`;
            }
            else if (tooltip.getAttribute('data-position') === 'right') {
               tooltipText.style.left = `${elementRight + (tooltip.offsetWidth * 0.2)}px`;
               tooltipText.style.top = `${elementTop - (tooltip.offsetHeight * 0.2)}px`;
            }
         }
         // tooltip position bottom 
         if (bottomScreen < tooltipText.offsetHeight) {
            tooltipText.style.top = `${elementTop - (e.clientY * 0.1)}px`;
         }
         // tooltip position top
         if (elementTop < tooltipText.offsetHeight) {
            tooltipText.style.top = `${elementBottom + (e.clientY * 0.1)}px`;
         }
         // tooltip position right
         if (rightScreen < tooltipText.offsetWidth) {
            tooltipText.style.left = `${elementLeft - (tooltipText.offsetWidth + (tooltip.offsetWidth * 0.2))}px`;
         }
         // tooltip position left
         if (elementLeft < tooltipText.offsetWidth) {
            tooltipText.style.left = `${elementRight + 10}px`;
         }
      });
      // mouseleave event listener 
      tooltip.addEventListener('mouseleave', () => {
         tooltipText.removeAttribute('style')
         tooltip.classList.remove('tooltip');
         tooltip.setAttribute('title', tooltipContent);
         document.body.removeChild(tooltipText);
      });
   });
}
/**
 * ================================== SUBMENU (DROP-DOWN) SECTION ====================================== 
 * */
function createDropDownMenu() {
   const dropDownMenu = document.getElementById('menu');
   // Click event 
   dropDownMenu.addEventListener('click', (e) => {
      // to prevent the default behaviour of the anchor tag on 'onclick' event
      e.preventDefault();
      // matches for the next sibling or not i.e <ul></ul>(submenu)
      if (e.target.nextElementSibling !== null) {
         // dynamic selection of submenu
         let currentSubMenu = document.getElementById(e.target.nextElementSibling.id);
         // show and display the current submenu.
         if (currentSubMenu.classList.contains('collapse')) {
            currentSubMenu.classList.remove('collapse');
         }
         else {
            // method that collapse all the submenus and nested submenus.
            submenuCollapsed(currentSubMenu);
            currentSubMenu.classList.add('collapse');
         }
      }
   });
}
// method to find the nested submenus of submenu, if present than collapse all the nested submenus
function submenuCollapsed(submenu) {
   if (submenu.hasChildNodes()) {
      for (let submenuChild of submenu.children) {
         // matches for the submenu in the list(<li></li>)
         if (submenuChild.classList.contains('menu-item-child')) {
            /**
             * list have 2 children, 1st is anchor tag(<a></a>) & 2nd is submenu(<ul></ul>)
             * item(0) ===> anchor tag & item(1) ===> submenu
             */
            //console.log(submenuChild.children.item(1));
            // submenu is not collapsed  
            if (!submenuChild.children.item(1).classList.contains('collapse')) {
               submenuChild.children.item(1).classList.add('collapse');
               // recursion to find nested submenus.
               submenuCollapsed(submenuChild.children.item(1));
            }
         }
      }
   }
}
/**
 * ========================================= DRAWER TOGGLE SECTION ========================================== 
 * 
 */
function createDrawerToggle() {
   const drawerToggle = document.querySelectorAll('[data-toggle="drawer"]');
   const drawer = document.querySelector('#drawerModal');
   const backdropDrawer = document.querySelector('[data-modal="backDrop-drawer');
   //
   drawerToggle.forEach((btn) => {
      // click event listener for Drawer toggles 
      btn.addEventListener('click', (e) => {
         e.preventDefault();
         // passing 'position' attribute
         openDrawer(btn.getAttribute('data-position'));
      });
   });
   // open and close Drawer method
   function openDrawer(position) {
      drawer.classList.remove('collapse');
      document.body.classList.add('modal-open');
      // position of Drawer
      if (position) {
         document.querySelector('[data-modal-position="position"]').classList.add(`${position}`);
         setTimeout(() => {
            document.querySelector('[data-modal-position="position"]').classList.add(`to-${position}`);
         }, 100);
      }
      // reset the position and closing of Drawer
      backdropDrawer.addEventListener('click', () => {
         if (position) {
            document.querySelector('[data-modal-position="position"]').classList.remove(`to-${position}`);
            setTimeout(() => {
               document.querySelector('[data-modal-position="position"]').classList.remove(`${position}`);
            }, 250);
         }
         setTimeout(() => {
            drawer.classList.add('collapse');
            document.body.classList.remove('modal-open');
         }, 250);
      });
   }
}
/**
 * =========================================  MODAL/POPUP SECTION ========================================== 
 * 
 */
function createModal() {
   var isModalOpen = false, modalId = '';
   //
   const modalBtns = document.querySelectorAll('[data-toggle="modal"]');
   modalBtns.forEach((btn) => {
      // click event 
      btn.addEventListener('click', (e) => {
         e.preventDefault();
         // passing 'target' attribute
         openModal(btn.getAttribute('data-target'))
      });
   });
   //
   function openModal(id) {
      const modal = document.querySelector(id);
      modal.classList.remove('collapse');
      // method for closing the modal
      const close = () => {
         modal.classList.add('collapse');
         // first modal than was opened.
         if (modalId === modal.id) {
            document.body.classList.remove('modal-open');
            isModalOpen = false;
         }
      }
      // modal is open for the first time.
      if (!isModalOpen) {
         isModalOpen = true;
         modalId = modal.id;
         document.body.classList.add('modal-open');
      }
      // add transition to modal
      if (modal.querySelector('[data-modal="modal"]') && !modal.querySelector('[data-modal="modal"]').classList.contains('modal')) {
         setTimeout(() => {
            modal.querySelector('[data-modal="modal"]').classList.add('modal');
         }, 100);
      }
      // close and cancel btn
      modal.querySelectorAll('[data-toggle="close"]').forEach((closeBtn) => {
         closeBtn.addEventListener('click', () => {
            // remove transition from the modal
            if (modal.querySelector('[data-modal="modal"]')) {
               modal.querySelector('[data-modal="modal"]').classList.remove('modal');
            }
            // closing the modal with some delay
            setTimeout(close, 250);
         });
      });
      // backdrop for closing the modal
      modal.querySelector('[data-modal="backDrop-modal"]').addEventListener('click', () => {
         // remove transition from the modal
         if (modal.querySelector('[data-modal="modal"]')) {
            modal.querySelector('[data-modal="modal"]').classList.remove('modal');
         }
         // closing the modal with some delay
         setTimeout(close, 250);
      });
   }
}

function dragDrop() {
   let content = '';
   // drag-drop container
   dragula([document.querySelector('#dragDrop_container_left'), document.querySelector('#dragDrop_container_right')]);
   // remove spill container
   dragula([document.querySelector('#removeOnSpill_container_left'), document.querySelector('#removeOnSpill_container_right')], {
      removeOnSpill: true
   });
   // copy container
   const drake = dragula([document.querySelector('#copy_container_left'), document.querySelector('#copy_container_right')], {
      copy: function (el, source) {
         return source === document.querySelector('#copy_container_left')
      },
      accepts: function (el, target) {
         return target !== document.querySelector('#copy_container_left')
      },
      removeOnSpill: true
   });
   drake.on('drag', function (el, source) {
      content = el.innerText;
   });
   drake.on('drop', function (el, target, source) {
      if(source !== target){
         el.innerText = content;
      }
   });
   drake.on('shadow', function (el, container, source) {
      el.innerText = 'Drop Here'
      el.style.background = '#7ac0f8'
   });
   drake.on('dragend', function(el, source){
      el.innerText = content;
      el.style.background = '#d3eafd'
      content ='';
   });
   drake.on('cloned', function(clone, original){
      clone.style.background = '#7ac0f8';
   });
   // drake.on('out', function(el, source){
   //    el.innerText = content;
   //    el.style.background = '#d3eafd'
   // });
}