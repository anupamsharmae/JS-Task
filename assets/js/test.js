const accordianOne = document.getElementById('accordian_one');
const accordianTwo = document.getElementById('accordian_two');
const accordianThree = document.getElementById('accordian_three');
const accordianFour = document.getElementById('accordian_four');
const accordianFive = document.getElementById('accordian_five');

const accordianOneContent = document.getElementById('accordian_one_content');
const accordianTwoContent = document.getElementById('accordian_two_content');
const accordianThreeContent = document.getElementById('accordian_three_content');
const accordianFourContent = document.getElementById('accordian_four_content');
const accordianFiveContent = document.getElementById('accordian_five_content');
// // accordian 1
// accordianOne.addEventListener('click',()=>{
//    if(accordianOneContent.classList.contains('show')){
//       accordianOneContent.classList.remove('show');
//       accordianOne.classList.remove('arrow-down');
//    }
//    else{
//       accordianOneContent.classList.add('show');
//       accordianOne.classList.add('arrow-down');
//    }
// });
// //accordian 2
// accordianTwo.addEventListener('click',()=>{
//    if(accordianTwoContent.classList.contains('show')){
//       accordianTwoContent.classList.remove('show');
//       accordianTwo.classList.remove('arrow-down');
//    }
//    else{
//       accordianTwoContent.classList.add('show');
//       accordianTwo.classList.add('arrow-down');
//    }
// });
// //accordian 3
// accordianThree.addEventListener('click',()=>{
//    if(accordianThreeContent.classList.contains('show')){
//       accordianThreeContent.classList.remove('show');
//       accordianThree.classList.remove('arrow-down');
//    }
//    else{
//       accordianThreeContent.classList.add('show');
//       accordianThree.classList.add('arrow-down');
//    }
// });
// //accordian 4
// accordianFour.addEventListener('click',()=>{
//    if(accordianFourContent.classList.contains('show')){
//       accordianFourContent.classList.remove('show');
//       accordianFour.classList.remove('arrow-down');
//    }
//    else{
//       accordianFourContent.classList.add('show');
//       accordianFour.classList.add('arrow-down');
//    }
// });
// //accordian 5
// accordianFive.addEventListener('click',()=>{
//    if(accordianFiveContent.classList.contains('show')){
//       accordianFiveContent.classList.remove('show');
//       accordianFive.classList.remove('arrow-down');
//    }
//    else{
//       accordianFiveContent.classList.add('show');
//       accordianFive.classList.add('arrow-down');
//    }
// });
/*next task *****hidding previous accordain when clicked next********/
const accordianBtns =  document.getElementsByClassName('accordian-btn');
const accordianContents = document.getElementsByClassName('accordian-content');

function hideAccordian(){
   for(let accordianIndex=0; accordianIndex < accordianContents.length; accordianIndex++){
      if(accordianContents[accordianIndex].classList.contains('show')){
         accordianContents[accordianIndex].classList.remove('show')
         accordianBtns[accordianIndex].classList.remove('arrow-down');
      }
   }
}

// // accordian 1
// accordianOne.addEventListener('click',()=>{
//    if(accordianOneContent.classList.contains('show')){
//       hideAccordian();
//    }
//    else{
//       hideAccordian();
//       accordianOneContent.classList.add('show');
//       accordianOne.classList.add('arrow-down');
//    }
// });
// //accordian 2
// accordianTwo.addEventListener('click',()=>{
//    if(accordianTwoContent.classList.contains('show')){
//       hideAccordian();
//    }
//    else{
//       hideAccordian();
//       accordianTwoContent.classList.add('show');
//       accordianTwo.classList.add('arrow-down');
//    }
// });
// //accordian 3
// accordianThree.addEventListener('click',()=>{
//    if(accordianThreeContent.classList.contains('show')){
//       hideAccordian();
//    }
//    else{
//       hideAccordian();
//       accordianThreeContent.classList.add('show');
//       accordianThree.classList.add('arrow-down');
//    }
// });
// //accordian 4
// accordianFour.addEventListener('click',()=>{
//    if(accordianFourContent.classList.contains('show')){
//       hideAccordian();
//    }
//    else{
//       hideAccordian();
//       accordianFourContent.classList.add('show');
//       accordianFour.classList.add('arrow-down');
//    }
// });
// //accordian 5
// accordianFive.addEventListener('click',()=>{
//    if(accordianFiveContent.classList.contains('show')){
//       hideAccordian();
//    }
//    else{
//       hideAccordian();
//       accordianFiveContent.classList.add('show');
//       accordianFive.classList.add('arrow-down');
//    }
// });


// accordian btn click event handler loop
for(let index = 0; index < accordianBtns.length; index++){
   //console.log(accordianBtns[index])
   accordianBtns[index].addEventListener('click',()=>{
      console.log(index)
      if(accordianBtns[index].classList.contains('arrow-down')){
         hideAccordian();
      }
      else{
         hideAccordian();
         accordianBtns[index].classList.add('arrow-down');
         accordianContents[index].classList.add('show')
      }
   });
}


/** modified content **/
/*--------------collect frequency, service, extras data--------------------*/
const collectDataBtn = document.createElement('button');
collectDataBtn.setAttribute('class','btn');
collectDataBtn.innerText = 'Submit data';
collectDataBtn.addEventListener('click',()=>{
   formData['frequency_id'] = getToggleBtnId();
   /* frequency toggle btn id*/
   let toggleBtnId = getToggleBtnId();

   /*service category id*/
   let serviceCategoryId = getCategoryId();

   /* extras selected id*/
   let extrasId = getExtrasId();
  
   // creating and assigning the collected Ids to an object
   const collectedDataObj = {
      frequency_id: toggleBtnId ? toggleBtnId : '',
      service_category_id: serviceCategoryId ? serviceCategoryId : '',
      extras: extrasId
   };
   
   console.log(collectedDataObj)
   console.log(JSON.stringify(collectedDataObj));
});
//add before clock section
document.getElementById('extra').insertAdjacentElement("afterend",collectDataBtn);

//method to get Frequency toggle btn id
function getToggleBtnId(){
   let frequencyWrapper = document.getElementById('frequency');
   let frequencyChildLength = frequencyWrapper.children.length;
   if (frequencyChildLength > 0) {
      for (let index = 0; index < frequencyChildLength; index++) {
         //check for children having classname = "toggle-btn--active"
         if (frequencyWrapper.children[index].classList.contains('toggle-btn--active')) {
            return (frequencyWrapper.children[index].getAttribute('id'));
         }
      }
   }
}
//method to get selected category id
function getCategoryId(){
   let categorySelect = document.getElementById('service-category-select');
   if(categorySelect.value != 0)
      return categorySelect.value;
   else
      return '';
}

// method to checked extras ids 
function getExtrasId(){
   let checkboxs = document.getElementsByClassName('checkbox-control');
   let checkedIds = [];
   for (let checkbox of checkboxs){
      if(checkbox.checked)
      checkedIds.push(checkbox.getAttribute('id'));
   }
   return checkedIds;
}