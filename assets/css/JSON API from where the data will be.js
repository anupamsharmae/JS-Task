// JSON API from where the data will be fetched
const appload_url = 'https://demo1.bookingkoala.co.in/api/v2/appload-new';
// function capitalizeWord(){
//     let section = 'service_category';
//     // let word = section.replace('_',' ');
//     let word = section.charAt(0).toUpperCase() + section.slice(1)
//     word = word.split("_");
//     console.log(word);
// }
// function call to create dynamic sections
createSections();
// function that create dynamic sections
function createSections(){
    let sections  = ['frequency','service_category','extra','form','clock'];
    for(let section of sections){
        const div = document.createElement('div');
        const sectionTitle = document.createElement('h3');
        div.setAttribute('id',section);
        sectionTitle.innerText = section;
        div.appendChild(sectionTitle);
        document.body.appendChild(div);
    }
}
// calling function to fetch the data from url
get_appload(appload_url);

//fetching data from api
async function get_appload(url){
    let appload = await fetch(url);
    let  appload_data= await appload.json();
    // check for frequency item in api
    if(appload_data && appload_data.response && appload_data.response.data){
         // check whether frequency array is exit & empty or not.
        if(appload_data.response.data.frequencies && appload_data.response.data.frequencies.length > 0){

                // function that create btn passing array as an arguements.
                createFrequencyBTN(appload_data.response.data.frequencies);
        }
        // check for service category in api
        if(appload_data.response.data.service_category){
            // fuction that create service category form passing category array as arguement
            createServiceCategory(appload_data.response.data.service_category);
        }
        //check for extras in api
        if(appload_data.response.data.extras){
            //function that create extras section
            createExtras(appload_data.response.data.extras);
        }
    }
    else
    console.log("object not find!");
}

//------------- div for btn wrap in body where elements are shown
//function to create btn
function createFrequencyBTN(frequencies){
    for(let frequency of frequencies){
        const btn = document.createElement('button');
        btn.setAttribute('id', frequency.id);
        btn.setAttribute('class', 'btn');
        btn.addEventListener('click', toggleBtn);
        btn.innerText = frequency.name;
        //appending to frequency section
        document.getElementById('frequency').appendChild(btn);
    }
}
//toggle frequency button
function toggleBtn(){
   let frequencyChildren = document.getElementById('frequency');
   //traversing the children
   for(let index = 0 ; index < frequencyChildren.children.length ; index++)
   {
       //check for children having classname = "active"
        if(frequencyChildren.children[index].classList.contains('active'))
            frequencyChildren.children[index].classList.remove('active');
   }
   this.classList.add('active');
}

// ----------- div for service category wrap in body where elements are shown
// Services category function
function createServiceCategory(serviceCategory){
    const form = document.createElement('form');
    const select = document.createElement('select');
    //check for service category is not empty
    if(serviceCategory.length > 0){
        for(let option of serviceCategory){
            //console.log(option)
            const opt = document.createElement('option');
            opt.text = option.name;
            opt.value = option.id;
            select.appendChild(opt);
        }
    }
    else
        console.log('no data found')
    form.appendChild(select);
    document.getElementById('service_category').appendChild(form);
}

// ------------- div for extras section wrap in body where elements are shown
// Extras section function
function createExtras(extras){
    if(extras){
        const item_wrap = document.createElement('div');
        item_wrap.setAttribute('class', 'item-wrap');
        //loop for creating items based on extras
        for (let extra of extras){
            const checkboxWrap = document.createElement('div')
            const checkboxItem = document.createElement('input');
            const checkboxLabel = document.createElement('label')
            checkboxWrap.setAttribute('class', 'checkbox-item')
            checkboxItem.setAttribute('type', 'checkbox');
            checkboxItem.setAttribute('class', 'checkbox-control');
            checkboxItem.setAttribute('name', extra.name);
            checkboxItem.setAttribute('id', extra.name);
            checkboxLabel.setAttribute('for', extra.name);
            checkboxLabel.innerText = extra.name;
            checkboxWrap.appendChild(checkboxItem);
            checkboxWrap.appendChild(checkboxLabel);
            item_wrap.appendChild(checkboxWrap);
            document.getElementById('extra').appendChild(item_wrap);
        }
    }
    else{
        console.log('extras');
    }
}

/* --------------- FORM section ------------------------*/
//Form creation function
function createForm(){
    const form = document.createElement('form');
    form.setAttribute('name','myForm');
    // name group
    const fname_wrap = document.createElement('div');
    const fname_label = document.createElement('label');
    const fname = document.createElement('input');
    fname_wrap.setAttribute('class', 'form-group');
    fname_label.setAttribute('for', 'fullname');
    fname_label.innerText = 'Name';
    fname.setAttribute('type', 'text');
    fname.setAttribute('id', 'fullname');
    fname.setAttribute('name', 'fullname');
    fname.setAttribute('class', 'form-control');
    fname.setAttribute('placeholder','Fullname');
    //email group
    const email_wrap = document.createElement('div');
    const email_label = document.createElement('label');
    const email = document.createElement('input');
    email_wrap.setAttribute('class', 'form-group');
    email_label.setAttribute('for','email');
    email_label.innerText = 'Email';
    email.setAttribute('type', 'email');
    email.setAttribute('id', 'emailID');
    email.setAttribute('name', 'email');
    email.setAttribute('class', 'form-control');
    email.setAttribute('placeholder','Email ID');
    //textarea group
    const textarea_wrap = document.createElement('div');
    const textarea_label = document.createElement('label');
    const textarea = document.createElement('textarea');
    textarea_wrap.setAttribute('class', 'form-group');
    textarea_label.setAttribute('for', 'note');
    textarea_label.innerText = 'review';
    textarea.setAttribute('id', 'note');
    textarea.setAttribute('name','note');
    textarea.setAttribute('class','form-control');
    textarea.setAttribute('rows','5');
    textarea.setAttribute('cols','20');
    //submit btn group
    const btn_wrap = document.createElement('div');
    const submit_btn = document.createElement('button');
    btn_wrap.setAttribute('class','btn-wrap')
    submit_btn.setAttribute('class','btn')
    submit_btn.innerText = 'Submit';
    submit_btn.addEventListener('click', showFormData);
    //append name group
    fname_wrap.appendChild(fname_label);
    fname_wrap.appendChild(fname);
    form.appendChild(fname_wrap);
    //append email group
    email_wrap.appendChild(email_label);
    email_wrap.appendChild(email);
    form.appendChild(email_wrap);
    //append textarea
    textarea_wrap.appendChild(textarea_label);
    textarea_wrap.appendChild(textarea);
    form.appendChild(textarea_wrap);
    //append submit btn
    btn_wrap.appendChild(submit_btn);
    form.appendChild(btn_wrap);
    //append form in form section
    document.getElementById('form').appendChild(form);
}
// Display function when submit btn is clicked
function showFormData(event){
    //prevent the page from reload
    event.preventDefault();
    const fullname = document.getElementById('fullname');
    const emailID = document.getElementById('emailID');
    const note = document.getElementById('note');
    //validate function call to validate the inputs fields
    if(validateInputFields(fullname, emailID, note)){
        console.log('Fullname : ' + fullname.value + "\n" + 'Email ID : ' + emailID.value + "\n" + 'Notes : ' + note.value);   
    }
    else
        console.log('Input fields are invalid!');
}
// function that validate form inputs
function validateInputFields(fullname,emailID, note){
    //check for empty strings
    if(fullname.value ==='' && emailID.value  ==='' && note.value ===''){
        console.log("inputs fields are empty!");
        return 0;
    }
    //check for fullname
    else if(!(/^[a-zA-Z\s.]+$/.test(fullname.value))){
        console.log('full name is not proper!')
        return 0;
    }
    //check for emailID
    else if(!(/^[a-z_.]+(@)?=(a-z.)+$/.test(emailID.value))){
        console.log('email is not proper!');
        return 0;
    }
    //check for Notes
    else if(!(/^[a-zA-Z\s.!#?]+$/.test(note.value))){
        console.log('review is not proper!');
        return 0;
    }
    // if all the conditons are failed then inputs fields are proper validated and return true
    else
        return 1;
}

// function call to create form
//createForm();

/*------------ Clock Section -------------*/
//function call to display clock
createClock();
//Create clock and display time
function createClock(){  
    const clock_wrapper = document.createElement('div');
    let date_span = document.createElement('span'); 
    let time_span = document.createElement('span');
    setInterval(()=>{
        let date = new Date();
        date_span.innerText = date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear();
        time_span.innerText = date.getHours() + ":" + date.getMinutes() + ":"+ date.getSeconds();
        clock_wrapper.appendChild(date_span);
        clock_wrapper.appendChild(time_span);
    },1000);
    document.getElementById('clock').appendChild(clock_wrapper);
}
/* --------- Chat button ---------*/
createChatBtn();

function createChatBtn(){
    const chat_btn = document.createElement('button');
    chat_btn.setAttribute('class','btn chat-btn');
    chat_btn.innerHTML = '<i class="fas fa-comment-alt-lines chat-icon"></i>';
    document.body.appendChild(chat_btn);
}