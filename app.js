let submitBtn = document.getElementById("submitBtn");
let clearBtn = document.getElementById("clearBtn");
let bmiCount = document.querySelector(".bmiCount");
let bmiRecord = [];

submitBtn.addEventListener("click", showBMI);
clearBtn.addEventListener("click", clearContent);

//BMI = 體重(公斤) / (身高(公尺) x 身高(公尺)) 
function calculateBMI(w, h){
    return (parseInt(w)/Math.pow(parseInt(h)/100, 2)).toFixed(2);
}

//過輕(BMI ＜ 18.5)、正常(18.5 ≦ BMI ＜ 24.0)、過重(24.0 ≦ BMI ＜ 27.0)，及肥胖(BMI ≧ 27.0)
function bmiSuggestion(bmi){
    if(bmi<18.5){
        return {
            message: "體重過輕，需要多運動，均衡飲食，以增加體能，維持健康！",
            className: "underweight"
        }
    } else if(bmi<24){
        return {
            message: "恭喜！「健康體重」，要繼續保持！",
            className: "healthy"
        }
    } else if(bmi<27){
        return {
            message: "「體重過重」了，要小心囉，趕快力行「健康體重管理」！",
            className: "overweight"
        }
    } else {
        return {
            message: "啊～「肥胖」，需要立刻力行「健康體重管理」囉！",
            className: "obese"
        }
    }
}

function showBMI(){
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    
    //提示輸入空白
    if(height == "" || weight == ""){
        alert("請輸入身高及體重");
    } else {
        let bmi = calculateBMI(weight, height);
        let messageSet = bmiSuggestion(bmi);

        bmiRecord.push(bmi);

        //新增紀錄
        let newDiv = document.createElement('div')
        let newBmi = document.createElement('p');
        let newSug = document.createElement('p');

        newBmi.textContent = "身高："+ height + "cm、體重：" + weight + "kg、BMI " + bmi;
        newSug.textContent = messageSet.message;

        newBmi.setAttribute("class", "bmiResult");
        newSug.setAttribute("class", "suggestion");
        newDiv.setAttribute("class", "calResult "+messageSet.className);

        newDiv.appendChild(newBmi);
        newDiv.appendChild(newSug);

        bmiCount.innerHTML = "總計測量 " + bmiRecord.length +" 筆，平均 BMI 為 "+ Math.round(bmiRecord.reduce((a, cv) => a + Number(cv), 0)/bmiRecord.length);

        document.querySelector('.resultDiv').appendChild(newDiv);
    }
}

function clearContent(){
    let resultDiv = document.querySelectorAll(".calResult");
    document.getElementById("height").value = '';
    document.getElementById("weight").value = '';
    bmiCount.innerHTML = '';

    resultDiv.forEach((el) => el.remove());
    bmiRecord = [];
}