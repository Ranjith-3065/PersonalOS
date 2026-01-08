async function init() {
      try {
        const res = await fetch('/personalOS/profile/data');
        const data = await res.json();
        
        if(data.success) {
          // Update Identity
          document.getElementById('acc-name').textContent = data.name;
          document.getElementById('acc-email').textContent = data.email;
          document.getElementById('logo-letter').textContent = data.name[0].toUpperCase();
        if(data.Verified){
          document.querySelector('#verify-badge').textContent = 'Verifed';
          document.querySelector('#verified-btn').style.display= 'none';
        }
          
          // Phone Number Logic
          const phoneText = document.getElementById('phone-text');
          const phoneBtn = document.getElementById('phone-btn');
          const removeBtn = document.getElementById('phone-remove-btn');
      } 
    }
    catch (e) {
        console.log("Running in demo mode. Connect to backend to see live data.");
      }
    }
init();

    async function requestVerification() {
      await fetch("/personalOS/account/updatedata", {
    method: "PATCH"
  });
      document.getElementById('overlay').style.display = 'block';
            document.getElementById('verifyModal').style.display = 'block';
        
    }

        function closeVerification(){
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('verifyModal').style.display = 'none';

        }

        async function submitVerification(){
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('verifyModal').style.display = 'none';

            const otpdata = [];
           const otp =  document.querySelectorAll('.otp-box');
            otp.forEach(otpvalue => {
              otpdata.push(otpvalue.value);
            });
            const od = otpdata.join("");

            if(od.length!=6){
              alert("enter the full otp");
              return;
            }

          const res = await fetch('/personalOS/account/otp',{
          method: 'PATCH',
          headers:{
            "content-type" : "application/json"
          },
          body:JSON.stringify({od})
        });
        const data = await res.json();
        if(data.success){
          console.log("data values",data)
          // document.querySelector('#verify-badge').textContent = 'verified';
        }
        if(data.Verified){
          document.querySelector('#verify-badge').textContent = 'verified';
        }
        }