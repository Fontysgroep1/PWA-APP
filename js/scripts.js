if("serviceWorker" in navigator){
    navigator.serviceWorker.register("serviceworker.js").then(function(registering){
      // Registration was successful
      console.log("Browser: Service Worker registration is successful with the scope",registering.scope);
    }).catch(function(error){
      //The registration of the service worker failed
      console.log("Browser: Service Worker registration failed with the error",error);
    });
  } else {
    //The registration of the service worker failed
    console.log("Browser: I don't support Service Workers :(");
  }


  //Asking for permission with the Notification API
if(typeof Notification!==typeof undefined){ //First check if the API is available in the browser
	Notification.requestPermission().then(function(result){ 
		//If accepted, then save subscriberinfo in database
		if(result==="granted"){
			console.log("Browser: User accepted receiving notifications, save as subscriber data!");
			navigator.serviceWorker.ready.then(function(serviceworker){ //When the Service Worker is ready, generate the subscription with our Serice Worker's pushManager and save it to our list
				const VAPIDPublicKey="BIRvfQA7YyvkyOkq4C4xoB8S-K1SFQKBJwJuGgtk8P6wHuy4N7lrI37ZPQbbx7PIX43sViug-tIgsCikkiELz_k"; // Fill in your VAPID publicKey here
				const options={applicationServerKey:VAPIDPublicKey,userVisibleOnly:true} //Option userVisibleOnly is neccesary for Chrome
				serviceworker.pushManager.subscribe(options).then((subscription)=>{
          //POST the generated subscription to our saving script (this needs to happen server-side, (client-side) JavaScript can't write files or databases)
					let subscriberFormData=new FormData();
					subscriberFormData.append("json",JSON.stringify(subscription));
					fetch("data/saveSubscription.php",{method:"POST",body:subscriberFormData});
				});
			});
		}
	}).catch((error)=>{
		console.log(error);
	});
}
 


let installPrompt; //Variable to store the install action in
let installbutton_element=document.querySelector("#install")
window.addEventListener("beforeinstallprompt",(event)=>{	
	event.preventDefault(); //Prevent the event (this prevents the default bar to show up)
	installPrompt=event; //Install event is stored for triggering it later
	//...do something here to show your install button
    installbutton_element.style.display="block"
})

installbutton_element.addEventListener("click",()=>{
    installbutton_element.style.display="none"
//Recognize the install variable from before?
installPrompt.prompt();
//..Put code here that hides your install button
installPrompt.userChoice.then((choiceResult)=>{
  //Hide the install button here again
  if(choiceResult.outcome!=="accepted"){
    //..If it was not accepted to install than show the install button again
  }
  installPrompt=null;
})
})
function changeImage() {
  document.getElementById("kenteken").src = "/images/kentekent2.png";
}

function restoreImage() {
  document.getElementById("kenteken").src = "/images/kenteken1.png";
}
function changeImage() {
  document.getElementById("kenteken").src = "/images/kenteken3.png";
}

function restoreImage() {
  document.getElementById("kenteken").src = "/images/kenteken4.png";
}
