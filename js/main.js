import { getData } from "./modules/dataMiner.js";
import { SendMail } from "./components/mailer.js";


(() => {

    // home page GS animation 
    const timeline = gsap.timeline({ default: { duration: .4}});

    timeline
        .from("header", { opacity: 0, y: "-6%", ease: "power1.out" })
        .from(".home-about", { opacity: 0, y: "-4%", ease: "power1.out"})
        .from(".works", { opacity: 0, y: "-4%", ease: "power1.out"})
        .from(".gallery-section", { opacity: 0, y: "-4%", ease: "power1.out"})
        .to(".underline", {borderBottom: "solid 3px #51d4f5", ease: "power1.out", stagger: 0.3} )
        .from("footer", { opacity: 0, y: "-6%", ease: "power1.out"})

    //Gallery Fetch
    let galleryTemplate = document.querySelector('#gallery-template').content,
        galleryList = document.querySelector('.gallery-section');
        
    function buildGallery(data) {
        const projectList = Object.keys(data);

        projectList.forEach(project => {
            let panel = galleryTemplate .cloneNode(true);
            let containers = panel.firstElementChild.children;
            
            containers[0].querySelector('img').src = `images/${data[project].pic}`;
            containers[1].textContent = data[project].name;
            containers[2].textContent = data[project].type;

            galleryList.appendChild(panel);
        })

    }
    getData(`./data/galleryData.json`, buildGallery);


   // Contact form
   const { createApp } = Vue

   createApp({
       data() {
           return {
               message: 'Hello Vue!'
           }
       },

       methods: {
           processMailFailure(result) {
               // show a failure message in the UI
               // use this.$refs to connect to the elements on the page and mark any empty fields/inputs with an error class
               alert('failure! and if you keep using an alert, DOUBLE failure!');        
               // show some errors in the UI here to let the user know the mail attempt was successful
           },

           processMailSuccess(result) {
               // show a success message in the UI
               alert("success! but don't EVER use alerts. They are gross.");        
               // show some UI here to let the user know the mail attempt was successful
           },

           processMail(event) {        
               // use the SendMail component to process mail
               SendMail(this.$el.parentNode)
                   .then(data => this.processMailSuccess(data))
                   .catch(err => this.processMailFailure(err));
           }
       }
   }).mount('#mail-form')

})();