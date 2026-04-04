const submitBtn = document.querySelector('#createHabitBtn');

submitBtn.addEventListener('click',async()=>{
    const habitDescription = document.querySelector('#habitName').value;
    const habitTarget = document.querySelector('#habitTarget').value;
    const habitUnit = document.querySelector('#habitUnit').value;
    const habitFrequency = document.querySelector('#habitFrequency').value;
    const habitColor = document.querySelector('#habitColor').value;
    const res = await fetch('/personalOS/habits/create',{
        method:'POST',
        headers:{
            'content-Type':'application/json'
        },
        body: JSON.stringify({habitDescription,habitColor,habitFrequency,habitTarget,habitUnit})
    })
    const data = await res.json();
    if(data.success){
        alert("Your data Entered Success Full")
    }

})


